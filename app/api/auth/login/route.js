// @ts-nocheck
import User from '@/server/modal/User'
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../server/utils/dbConnect";
import jwt from 'jsonwebtoken';

// @ts-ignore
export const POST = async (request) => {
  try {
    await dbConnect();
    const { email, password } = await request.json();
    console.log(email, "email", password, "password");

    // Find the user in the database
    const user = await User.findOne({ email });

    // If user does not exist, return error
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    console.log(user, "user from db");

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords do not match, return error
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    console.log(passwordMatch, "password match");

    // Passwords match, login successful
    const token = jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    // Send the token as part of the response
    return NextResponse.json({ message: "success", data: user, token });
  } catch (error) {
    console.error("Error in server login:", error);
    return NextResponse.json({
      error: "Something went wrong in server login",
    }, { status: 500 });
  }
};
// Modify GET request to fetch tasks by user email
export const GET = async (request) => {
  try {
      const token = request.headers.get('Authorization').split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userEmail = decodedToken.email;

      // Fetch tasks associated with the user's email
      const tasks = await User.find({ email: userEmail }); // Use userEmail instead of email

      // Return tasks as JSON response
      return NextResponse.json(tasks);
  } catch (error) {
      console.error("Error fetching tasks:", error);
      return NextResponse.json({
          error: "Something went wrong while fetching tasks",
      }, { status: 500 });
  }
};
