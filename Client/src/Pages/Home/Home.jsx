import React, { useState } from 'react';
import axios from 'axios';

const Home = () => {

    const [image, setImage] = useState();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
        axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_APP_CLOUD_NAME}/image/upload`, formData)
            .then(res => setImage(res.data.secure_url))
            .catch(err => console.log(err))
    }



    return (
        <div className='bg-white min-h-screen flex items-center justify-center gap-10'>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md">
                <label className="block mb-4">
                    <span className="text-gray-700 font-medium">Choose a file</span>
                    <input
                        type="file"
                        name='image'
                        onChange={handleImageUpload}
                        className="mt-2 block border w-full text-sm text-gray-500
                                   file:mr-4 file:py-2 file:px-4
                                   file:rounded-md file:border-0
                                   file:text-sm file:font-semibold
                                   file:bg-blue-50 file:text-blue-700
                                   hover:file:bg-blue-100"
                    />
                </label>
                <button
                    type='submit'
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200">
                    Upload Image
                </button>
            </div>
            <hr />
            <div>
                <img
                    className='max-w-sm'
                    src={image}
                    alt="image" />
                <p className='text-lg text-green-500'> <span className='font-bold'>URL: </span>{image}</p>
            </div>
        </div>
    )
}

export default Home