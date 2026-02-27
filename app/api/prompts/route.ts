import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb/client';
import { PromptModel } from '@/lib/mongodb/models/Prompt';
import { TemplateProcessor } from '@/lib/prompt-engine/template-processor';
import { verifyAuth } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { title, description, template, model, tags, isPublic } = await request.json();

    // Validate variables in template
    const variables = TemplateProcessor.extractVariables(template.user);

    const db = await connectToDatabase();
    const promptModel = new PromptModel(db);

    const promptId = await promptModel.create({
      creatorId: user._id,
      title,
      description,
      template: { ...template, variables },
      model,
      tags,
      isPublic,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      promptId: promptId.toString(),
    });
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to create prompt' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const db = await connectToDatabase();
    const promptModel = new PromptModel(db);
    const prompts = await promptModel.listByCreator(user._id, 50);

    return NextResponse.json({
      success: true,
      prompts,
    });
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}