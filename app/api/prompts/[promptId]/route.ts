import { NextResponse } from 'next/server';
import MongoDBClient from '@/lib/mongodb/client';
import { Prompt } from '@/lib/mongodb/models/Prompt';

export async function GET(
  request: Request,
  { params }: { params: { promptId: string } }
) {
  try {
    const mongo = MongoDBClient.getInstance();
    await mongo.connect();
    
    const prompt = await Prompt.findById(params.promptId);
    
    if (!prompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }
    
    return NextResponse.json(prompt);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { promptId: string } }
) {
  try {
    const mongo = MongoDBClient.getInstance();
    await mongo.connect();
    
    const data = await request.json();
    const updatedPrompt = await Prompt.findByIdAndUpdate(
      params.promptId,
      { $set: data },
      { new: true }
    );
    
    if (!updatedPrompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }
    
    return NextResponse.json(updatedPrompt);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { promptId: string } }
) {
  try {
    const mongo = MongoDBClient.getInstance();
    await mongo.connect();
    
    const deletedPrompt = await Prompt.findByIdAndDelete(params.promptId);
    
    if (!deletedPrompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }
    
    return NextResponse.json({ message: "Prompt deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
