import React from 'react'

const Header = ({label}) => {
  return (
    <div className="text-center pt-4">
      <h3 className="text-4xl font-bold">{label}</h3>
    </div>
  );
}

export default Header