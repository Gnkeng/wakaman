import React from 'react';
import Button from '../../../common/button/Button';

const ViewReviewsCard = () => {
  return (
    <div
      className="px-10 w-[500px] bg-white py-4 mb-6 border rounded-lg"
      style={{
        boxShadow: '0px 20px 25px rgba(76, 103, 100, 0.1)',
        cursor: 'pointer',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        
      }}
    >
      <p className="text-2xl font-bold mb-5">View Reviews</p>
      <div>
      <Button
            // onClick={() => setShow(true)}
            text={'Enter'}
            buttonType={'PRIMARY'}
            fullWidth={true}
            fontweight={900}
            fontsize={17}
          />
      </div>
    </div>
  );
};

export default ViewReviewsCard;
