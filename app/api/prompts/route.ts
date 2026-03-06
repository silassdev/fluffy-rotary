import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { Prompt } from '@/lib/mongodb/models/Prompt';
import MongoDBClient from '@/lib/mongodb/client';

export async function GET() {
  try {
    const mongo = MongoDBClient.getInstance();
    await mongo.connect();
    
    // TODO: Filter by current user ID when auth is ready
    const prompts = await Prompt.find({}).sort({ updatedAt: -1 });
    
    return NextResponse.json(prompts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const mongo = MongoDBClient.getInstance();
    await mongo.connect();
    
    const data = await request.json();
    
    // Mock user ID for now since we're in early dev
    const mockUserId = new mongoose.Types.ObjectId();
    
    const newPrompt = new Prompt({
      ...data,
      userId: mockUserId,
    });
    
    await newPrompt.save();
    
    return NextResponse.json(newPrompt, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}