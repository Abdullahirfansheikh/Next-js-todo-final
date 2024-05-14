// @ts-nocheck
import User from "../../../server/modal/User";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import dbConnect from '../../../server/utils/dbConnect';

// Modify GET request to fetch tasks by user email
export const GET = async (request) => {
  try {
    await dbConnect();
    
    // Extract the Authorization header
    const authorizationHeader = request.headers.get('Authorization');
    
    if (!authorizationHeader) {
      return NextResponse.json({ error: "Authorization header is missing" }, { status: 400 });
    }
    
    // Split the header to extract the token
    const token = authorizationHeader.split(' ')[1];
    
    if (!token) {
      return NextResponse.json({ error: "Token is missing in Authorization header" }, { status: 400 });
    }
    
    // Verify the token and decode the user's email
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
    if (!decodedToken || !decodedToken.email) {
      return NextResponse.json({ error: "Invalid token or email not found" }, { status: 401 });
    }
    
    const userEmail = decodedToken.email;

    // Fetch tasks associated with the user's email
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return tasks associated with the user as JSON response
    return NextResponse.json({ message: "success", data: user.tasks });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({
      error: "Something went wrong while fetching tasks",
    }, { status: 500 });
  }
};
