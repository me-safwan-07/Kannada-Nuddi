import React from 'react';

function FakeAd({ className }) {
  return (
    <div className={`flex bg-gray-500 text-white p-4 rounded shadow-lg ${className}`}>
      <p className='align-middle text-gray-100'>Advetisment</p>
    </div>
  );
}

export default FakeAd;
