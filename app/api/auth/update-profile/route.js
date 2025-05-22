import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Admin from '@/models/Admin';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// GET method to fetch user's profile image
export async function GET(req) {
  try {
    await connectDB();
    
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Find the user in MongoDB
    const user = await Admin.findById(userId);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        image: user.image || ''
      }
    });

  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// PUT method to update user's profile image
export async function PUT(req) {
  try {
    await connectDB();
    
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Verify the token and get user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Get the image URL from request body
    const { imageUrl } = await req.json();

    if (!imageUrl) {
      return NextResponse.json({ message: 'Image URL is required' }, { status: 400 });
    }

    // Update the user's image in MongoDB
    const updatedUser = await Admin.findByIdAndUpdate(
      userId,
      { image: imageUrl },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Profile image updated successfully',
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        image: updatedUser.image
      }
    });

  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} 