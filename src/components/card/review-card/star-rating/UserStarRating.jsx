import { useState } from "react";

export default function useStarRating(totalStar) {
  const [stars, setStars] = useState(totalStar);
  const [hoverd, setHovered] = useState();
  const [rated, setRated] = useState();
  // console.log(setStars)

  // handler for rating
  const handleSetRated = (value) => {
    setRated(value);
  };
  // handler for hoverd state
  const handleSetHovered = (value) => {
    setHovered(value);
  };

  // reset handler
  const handleReset = () => {
    setRated(-1);
    setHovered(-1);
  };

  return {
    stars,
    hoverd,
    rated,
    handleSetRated,
    handleSetHovered,
    handleReset,
  };
}
