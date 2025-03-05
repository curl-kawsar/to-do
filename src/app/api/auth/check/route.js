import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
    
    await connectDB();
    const user = await User.findById(decoded.userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  }
} 