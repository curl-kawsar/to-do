import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export function withAuth(handler) {
  return async (request, params) => {
    try {
      const cookieStore = cookies();
      const token = cookieStore.get('token');

      if (!token) {
        return NextResponse.json(
          { error: 'Not authenticated' },
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

      // Verify and decode the token
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET);
      
      if (!decoded.userId) {
        return NextResponse.json(
          { error: 'Invalid token format' },
          { status: 401 }
        );
      }

      // Add userId to the request
      request.userId = decoded.userId;

      // Call the original handler
      return handler(request, params);
    } catch (error) {
      console.error('Auth error:', error);
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
  };
} 