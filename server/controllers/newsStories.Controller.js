import asyncHandler from 'express-async-handler';
import NewsStories from '../models/NewsStories.js';

// import cloudinary from '../utils/cloudinary.js';

// @desc    Create a new story
// @route   POST /api/stories
// @access  Private
const createStory = asyncHandler(async (req, res) => {
  const { title, slides, duration } = req.body;

  const story = await NewsStories.create({
    // user: req.user._id,
    title,
    coverImage: slides[0].image,
    slides,
    duration,
  });

  if (story) {
    res.status(201).json(story);
  } else {
    res.status(400);
    throw new Error('Invalid story data');
  }
});

// @desc    Get all stories
// @route   GET /api/stories
// @access  Public
const getStories = asyncHandler(async (req, res) => {
  const stories = await NewsStories.find({});
  res.json(stories);
});

// @desc    Get story by ID
// @route   GET /api/stories/:id
// @access  Public
const getStoryById = asyncHandler(async (req, res) => {
  const story = await NewsStories.findById(req.params.id);

  if (story) {
    res.json(story);
  } else {
    res.status(404);
    throw new Error('Story not found');
  }
});

// @desc    Upload image
// @route   POST /api/upload
// @access  Private
// const uploadImage = asyncHandler(async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'web-stories',
//     });
//     res.json({
//       url: result.secure_url,
//       public_id: result.public_id,
//     });
//   } catch (error) {
//     res.status(500);
//     throw new Error('Image upload failed');
//   }
// });

export { createStory, getStories, getStoryById };