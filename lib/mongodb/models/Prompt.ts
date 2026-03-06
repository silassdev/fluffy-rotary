import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IPrompt extends Document {
  title: string;
  template: string;
  systemInstruction?: string;
  variables: string[];
  model: string;
  userId: mongoose.Types.ObjectId;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const PromptSchema = new Schema<IPrompt>(
  {
    title: { 
      type: String, 
      required: true,
      trim: true
    },
    template: { 
      type: String, 
      required: true 
    },
    systemInstruction: { 
      type: String,
      default: ""
    },
    variables: {
      type: [String],
      default: []
    },
    model: {
      type: String,
      required: true,
      default: "gpt-4"
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    isPublic: {
      type: Boolean,
      default: false
    }
  },
  { 
    timestamps: true 
  }
);

export const Prompt = models.Prompt || model<IPrompt>("Prompt", PromptSchema);