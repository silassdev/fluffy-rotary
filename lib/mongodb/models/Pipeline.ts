import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IPipelineStep {
  promptId: mongoose.Types.ObjectId;
  order: number;
}

export interface IPipeline extends Document {
  name: string;
  steps: IPipelineStep[];
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const PipelineSchema = new Schema<IPipeline>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    steps: [
      {
        promptId: { type: Schema.Types.ObjectId, ref: "Prompt", required: true },
        order: { type: Number, required: true }
      }
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    }
  },
  { 
    timestamps: true 
  }
);

export const Pipeline = models.Pipeline || model<IPipeline>("Pipeline", PipelineSchema);
