import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 200, // Set a maximum length for title
    },
    content: {
      type: String,
      required: true,
      maxlength: 5000, // Optional: set a limit for content length
    },
    category: {
      type: String,
      default: 'uncategorized',
      maxlength: 50,
      index: true, // Index for quicker searches by category
    },
    image: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    slug: {
      type: String,
      unique: true, // Ensures slug is unique for each blog record
      required: true,
      index: true, // Index for quick searches by slug
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model('news', NewsSchema);

export default News;
