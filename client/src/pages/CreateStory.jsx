import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { app } from '../firebase';
import axios from 'axios';

const CreateStoryScreen = () => {
  const [title, setTitle] = useState('');
  const [slides, setSlides] = useState([{ image: '', caption: '' }]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    const storage = getStorage(app);
    const fileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `stories/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error('Image upload failed:', error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const newSlides = [...slides];
          newSlides[index].image = downloadURL;
          setSlides(newSlides);
        } catch (error) {
          console.error('Failed to retrieve download URL:', error);
        }
      }
    );
  };

  const handleAddSlide = () => {
    setSlides([...slides, { image: '', caption: '' }]);
  };

  const handleRemoveSlide = (index) => {
    const newSlides = slides.filter((_, i) => i !== index);
    setSlides(newSlides);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const storyData = {
        title,
        slides,
        duration: 10, // Example duration
      };

      const res = await axios.post('http://localhost:3000/api/story/', storyData);
      if (!res) {
        alert("error")
        console.error(res);
      } else {
        alert("published");
        console.log(res.data.slides)
      }
      navigate('/');
    } catch (error) {
      console.error('Error creating story:', error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Story</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded text-black"
            required
          />
        </div>

        {slides.map((slide, index) => (
          <div key={index} className="mb-6 p-4 border rounded">
            <div className="mb-4">
              <label className="block mb-2">Image</label>
              <input
                type="file"
                onChange={(e) => handleImageUpload(e, index)}
                className="mb-2 text-black"
                accept="image/*"
                required
              />
              {slide.image && (
                <img
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  className="w-40 h-40 object-cover"
                />
              )}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Caption</label>
              <input
                type="text"
                value={slide.caption}
                onChange={(e) => {
                  const newSlides = [...slides];
                  newSlides[index].caption = e.target.value;
                  setSlides(newSlides);
                }}
                className="w-full p-2 border rounded text-black"
              />
            </div>
            {slides.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveSlide(index)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Remove Slide
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddSlide}
          className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
        >
          Add Slide
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded"
        >
          {loading ? 'Creating...' : 'Create Story'}
        </button>
      </form>
    </div>
  );
};

export default CreateStoryScreen;
