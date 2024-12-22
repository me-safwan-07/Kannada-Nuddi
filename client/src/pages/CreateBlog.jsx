import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { Button, Select, TextInput, Alert, FileInput } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-quill/dist/quill.snow.css';
import 'react-circular-progressbar/dist/styles.css';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import { app } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
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
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['image'],
            ['clean'],
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
            console.error('Error fetching categories:', error);
        }
    };

    const handleUploadImage = async () => {
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
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!content || content.length === 0) {
            toast.error('Write the content first');
            return;
        }

        const newsData = {
            title: formData.title,
            subtitle: formData.subtitle,
            category: formData.category,
            content: content,
            image: formData.image,
        };

        try {
            const res = await axios.post('http://localhost:3000/api/news/create', newsData);
            if (res.status === 201) {
                toast.success('Blog published successfully!');
                navigate('/dashboard');
            } else {
                toast.error(res.data.message || 'Something went wrong');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to publish blog.');
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen text-black'>
            <ToastContainer />
            <h1 className="text-center text-3xl my-7 font-semibold">Write</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <Button type='submit' gradientDuoTone='purpleToPink'>
                    Publish
                </Button>
                <div className="flex flex-col gap-4 justify-between">
                    <TextInput
                        type='text'
                        placeholder='Enter title'
                        required
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <TextInput
                        type='text'
                        placeholder='Enter subtitle'
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    />
                </div>

                <div className="mb-4">
                    <Select
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                        <option value=''>Select a category</option>
                        {category.map((cat) => (
                            <option key={cat._id} value={cat.category}>
                                {cat.category}
                            </option>
                        ))}
                    </Select>
                </div>

                <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
                    <FileInput
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <Button
                        type="button"
                        onClick={handleUploadImage}
                        disabled={imageUploadProgress}
                    >
                        {imageUploadProgress ? (
                            <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
                        ) : (
                            <p>Upload Image</p>
                        )}
                    </Button>
                </div>
                {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                {formData.image && <img src={formData.image} alt="Uploaded" className="w-full h-72 object-cover" />}
                
                <div className="mb-4">
                    <ReactQuill
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        theme="snow"
                    />
                </div>
            </form>
        </div>
    );
}

export default CreateBlog;
