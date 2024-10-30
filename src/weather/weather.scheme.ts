import { Schema } from 'mongoose';

export const WeatherSchema = new Schema(
  {
    city: { type: String, required: true },
    data: { type: Object, required: true },
  },
  { timestamps: true },
);
