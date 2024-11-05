import React, { useState, useEffect } from 'react';
import { Button, Select, TextInput, Alert, FileInput } from 'flowbite-react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {app} from '../firebase';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function CreateBlog() {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        content: '',
        image: '',
    });
    const [content, setContent] = useState('');
    const [category, setCategory] = useState([]);
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const navigate = useNavigate();

    // Quill modules for toolbar customization
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }],
          ['image', 'video'],
          ['clean']
        ],
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/category/');
            setCategory(response.data);
        } catch (error) {
            console.error('Error fetching categories:',error);
        }
    }
    
    const handleUpdloadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image');
                return;
            }
            setImageUploadError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImageUploadError('Image upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null);
                        setImageUploadError(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
        } catch (error) {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    };
    

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content || content.length === 0) {
            toast.error('Write the content first');
            return;
        }

        // Prepare the data to be sent
        const newsData = {
            title: formData.title,
            category: formData.category,
            content: content,  // Assign Quill editor content to formData
            image: formData.image
        };

        try {
            const res = await axios.post('http://localhost:3000/api/news/create', newsData);

            if (res.status === 201) {
                const blogId = res.data.blogId;
                toast.success('Blog published successfully!');
                navigate('/');
            } else {
                const errorMessage = res.data.message || 'Something went wrong';
                toast.error(errorMessage);
            }
        } catch (err) {
            console.error('Fetch error:', err.message);
            const errorMessage = err.response?.data?.message || 'Failed to publish blog. Please try again later.';
            toast.error(errorMessage);
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <ToastContainer />
            <h1 className="text-center text-3xl my-7 font-semibold">Write</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <Button type='submit' gradientDuoTone='purpleToPink' className='text-black'>
                    Publish
                </Button>
                {/* Title Input */}
                <div className="flex flex-col gap-4 sm:flex-row justify-between">
                    <TextInput
                        type='text'
                        placeholder='Enter title'
                        required
                        id='title'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </div>

                {/* Category Select */}
                <div className="mb-4">
                    <Select onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                        <option value=''>Select a category</option>
                        {category.map((cat) => (
                            <option key={cat._id} value={cat.category}>
                                {cat.category}
                            </option>
                        ))}
                    </Select>
                </div>
                <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
            <FileInput
                type='file'
                accept='image/*'
                onChange={(e) => setFile(e.target.files[0])}
            />
            <Button
                type='button'
                gradientDuoTone='purpleToBlue'
                size='sm'
                outline
                onClick={handleUpdloadImage}
                disabled={imageUploadProgress}
            >
                {imageUploadProgress ? (
                <div className='w-16 h-16'>
                        <CircularProgressbar
                            value={imageUploadProgress}
                            text={`${imageUploadProgress || 0}%`}
                        />
                    </div>
                ) : (
                    'Upload Image'
                )}
                </Button>
            </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {formData.image && (
                <img
                    src={formData.image}
                    alt='upload'
                    className='relative aspect-video w-full h-72 object-cover'
                />
                )}
                {/* Content Editor */}
                <div className="mb-4">
                    <ReactQuill 
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        theme="snow"
                    />
                </div>

                {/* Submit Button */}
                
            </form>
        </div>
    );
}

export default CreateBlog;
