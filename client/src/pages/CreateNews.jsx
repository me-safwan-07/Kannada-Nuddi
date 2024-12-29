import React, { useState, useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Button, Select, TextInput, Alert, FileInput } from 'flowbite-react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import 'react-circular-progressbar/dist/styles.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { app } from '../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { getAllCategories } from '../services/operations/categoryApi';
import { createNews } from '../services/operations/newsApi';

function CreateNews() {
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        category: '',
        image: '',
    });
    const [categories, setCategories] = useState([]);
    const [file, setFile] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imageUploadError, setImageUploadError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const editorRef = useRef(null);

    // Fetch Categories
    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await getAllCategories();
                if (response && Array.isArray(response)) {
                    setCategories(response);
                } else {
                    toast.error('Failed to load categories.');
                }
            } catch (error) {
                toast.error('Failed to load categories.');
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setImageUploadError(null);
            uploadImageToFirebase(selectedFile);
        }
    };

    const uploadImageToFirebase = (file) => {
        const storage = getStorage(app);
        const fileName = `${new Date().getTime()}-${file.name}`;
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
                toast.error('Image Upload Failed');
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, image: downloadURL });
                    toast.success('Image uploaded successfully!');
                    setImageUploadProgress(null);
                });
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const content = editorRef.current ? editorRef.current.getContent() : '';
        if (!content || !formData.title || !formData.category) {
            toast.error('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        try {
            const newsData = {
                title: formData.title,
                subtitle: formData.subtitle,
                category: formData.category,
                content,
                image: formData.image,
            };

            const response = await createNews(newsData);
            if (!response) {
                toast.error('Failed to create blog');
                return;
            }

            toast.success('Blog created successfully!');
            navigate('/');
        } catch (error) {
            console.error(error);
            toast.error('Error creating blog. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="p-3 max-w-3xl mx-auto min-h-screen text-black">
            <ToastContainer />
            <h1 className="text-center text-3xl my-7 font-semibold">Write</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <Button type="submit" gradientDuoTone="purpleToPink" disabled={loading}>
                    {loading ? 'Publishing...' : 'Publish'}
                </Button>
                <div className="flex flex-col gap-4">
                    <TextInput
                        type="text"
                        placeholder="Enter title"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    <TextInput
                        type="text"
                        placeholder="Enter subtitle"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    />
                </div>

                <Select
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    value={formData.category}
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat.category}>
                            {cat.category}
                        </option>
                    ))}
                </Select>

                <div className="flex gap-4 items-center justify-between border-4 border-dotted p-3">
                    <FileInput accept="image/*" onChange={handleFileChange} />
                    {imageUploadProgress && (
                        <CircularProgressbar
                            value={imageUploadProgress}
                            text={`${imageUploadProgress}%`}
                            className="w-16 h-16"
                        />
                    )}
                </div>

                {formData.image && <img src={formData.image} alt="Uploaded" className="w-full h-72 object-cover" />}
                <Editor
                    apiKey='3tgj51u8e2pxufye96foszaw62z81hvq8ba59aao66uoscii'
                    onInit={(_evt, editor) => editorRef.current = editor}
                    initialValue="<p>Write the News here.</p>"
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'image',
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | image media | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        
                        file_picker_callback: (callback, value, meta) => {
                            // Custom file picker for inserting images or files
                            if (meta.filetype === 'image') {
                                const input = document.createElement('input');
                                input.setAttribute('type', 'file');
                                input.setAttribute('accept', 'image/*');
                                
                                input.onchange = async () => {
                                    const file = input.files[0];
                                    const reader = new FileReader();
                                    
                                    reader.onload = () => {
                                        const base64 = reader.result;
                                        callback(base64, { alt: file.name });
                                    };
                                    reader.readAsDataURL(file);
                                };
                                
                                input.click();
                            }
                        }
                    }}
                />
            </form>
        </div>
    );
}

export default CreateNews;
