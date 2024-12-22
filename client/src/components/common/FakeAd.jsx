import React from 'react';

function FakeAd({ className }) {
  return (
    <div className={`flex justify-center bg-gray-400 text-white py-2 rounded shadow-lg ${className}`}>
      <p className='flex text-gray-300'>Advetisment</p>
    </div>
  );
}

export default FakeAd;
