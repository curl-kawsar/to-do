import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import User from '@/app/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();
    const { email, password } = await request.json();

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not defined');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id.toString() }, // Ensure userId is a string
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Create the response
    const response = NextResponse.json({
      user: { 
        id: user._id.toString(),
        name: user.name,
        email: user.email
      }
    });

    // Set the token in a cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/', // Ensure cookie is available for all paths
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
} 