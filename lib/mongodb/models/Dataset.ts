import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IDataset extends Document {
  name: string;
  data: Record<string, any>[];
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DatasetSchema = new Schema<IDataset>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },
    data: { 
      type: [Schema.Types.Mixed], 
      required: true,
      default: []
    },
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

export const Dataset = models.Dataset || model<IDataset>("Dataset", DatasetSchema);
