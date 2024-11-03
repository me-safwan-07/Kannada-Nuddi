import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
    }
  }
);

const Category = mongoose.model('Category', CategorySchema);

export default Category;