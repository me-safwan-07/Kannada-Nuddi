import express from 'express';
import {
  createStory,
  getStories,
  getStoryById,
} from '../controllers/newsStories.Controller.js';

const router = express.Router();

router.route('/').post(createStory).get(getStories);
router.route('/:id').get(getStoryById);

export default router;