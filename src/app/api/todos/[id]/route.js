import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Todo from '@/app/models/Todo';
import { withAuth } from '../../middleware';

async function handleGET(request, { params }) {
  try {
    await connectDB();
    const userId = request.userId;
    const todo = await Todo.findOne({ _id: params.id, userId });
    
    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    return NextResponse.json(todo);
  } catch (error) {
    console.error('Get todo error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handlePATCH(request, { params }) {
  try {
    const updates = await request.json();
    const userId = request.userId;

    await connectDB();
    
    const todo = await Todo.findOneAndUpdate(
      { _id: params.id, userId },
      { $set: updates },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    return NextResponse.json(todo);
  } catch (error) {
    console.error('Update todo error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function handleDELETE(request, { params }) {
  try {
    const userId = request.userId;
    await connectDB();
    
    const todo = await Todo.findOneAndDelete({ _id: params.id, userId });
    
    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Todo deleted successfully' });
  } catch (error) {
    console.error('Delete todo error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const GET = withAuth(handleGET);
export const PATCH = withAuth(handlePATCH);
export const DELETE = withAuth(handleDELETE); 