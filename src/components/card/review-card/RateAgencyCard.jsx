import React, { useState } from 'react';
import StarRating from './star-rating/StarRatingsComponent';

const RateAgency = () => {
  return (
    <div
      className="px-10  bg-transparent py-4 mb-6  rounded-lg"
      style={{
        // boxShadow: '0px 20px 25px rgba(76, 103, 100, 0.1)',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <p className="text-2xl font-bold">Rate Agency</p>
      <div>
        <StarRating totalStar={5} />
      </div>
    </div>
  );
};

export default RateAgency;
