import mongoose, { Schema, model } from 'mongoose';
import { customAlphabet } from "nanoid";

// generate random key
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0987654321", 6);

// 1. Create an interface representing a document in MongoDB.
interface IUrl {
  url: string;
  key?: string;
  clicks?: number;
}

// 2. Create a Schema corresponding to the document interface.
const urlSchema = new Schema<IUrl>({
  url: { type: String, required: true },
  key: {
    type: String,
    unique: true,
    required: true,
    default: () => nanoid()
  },
  clicks: { type: Number, default: 0 }
});

// 3. Create a Model.
const Url = mongoose.models.Url || mongoose.model<IUrl>('Url', urlSchema);

export default Url;