import React, { useState } from 'react';
import { Button, TextInput } from 'flowbite-react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UploadThumbnail() {
    const [thumbnail, setThumbnail] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const blogId = location.state?.blogId;

    const handleFileChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!thumbnail) {
            toast.error('Please upload a thumbnail image');
            return;
        }

        const formData = new FormData();
        formData.append('thumbnail', thumbnail);

        try {
            setLoading(true);
            const res = await axios.post(`/api/blog/${blogId}/upload-thumbnail`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.status === 200) {
                toast.success('Thumbnail uploaded successfully!');
                navigate('/'); // Redirect to the homepage or wherever you want
            } else {
                toast.error('Failed to upload thumbnail. Please try again.');
            }
        } catch (err) {
            console.error('Upload error:', err.message);
            const errorMessage = err.response?.data?.message || 'Failed to upload thumbnail.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='p-3 max-w-3xl mx-auto min-h-screen'>
            <ToastContainer />
            <h1 className="text-center text-3xl my-7 font-semibold">Upload Thumbnail</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className="mb-4">
                    <TextInput
                        type='file'
                        accept='image/*'
                        required
                        onChange={handleFileChange}
                    />
                </div>

                <Button type='submit' gradientDuoTone='purpleToPink' disabled={loading}>
                    {loading ? 'Uploading...' : 'Submit'}
                </Button>
            </form>
        </div>
    );
}

export default UploadThumbnail;
