import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Todo from '@/app/models/Todo';
import { withAuth } from '../middleware';

async function handleGET(request) {
  try {
    await connectDB();
    const userId = request.userId;
    const todos = await Todo.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(todos);
  } catch (error) {
    console.error('Fetch todos error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

async function handlePOST(request) {
  try {
    const { title, description } = await request.json();
    const userId = request.userId;

    await connectDB();
    
    const todo = await Todo.create({
      title,
      description,
      userId
    });
    
    return NextResponse.json(todo, { status: 201 });
  } catch (error) {
    console.error('Create todo error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export const GET = withAuth(handleGET);
export const POST = withAuth(handlePOST); 