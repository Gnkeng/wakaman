import useStarRating from "./UserStarRating";
import styles from "./starRatings.module.css";

export default function StarRating({ totalStar }) {
  const {
    stars,
    hoverd,
    rated,
    handleSetHovered,
    handleSetRated,
    // handleReset
  } = useStarRating(totalStar);

  return (
    <div className={styles.star_container}>
      <div>
        {[...Array(stars)].map((each, i) => (
          <span
            key={i}
            onMouseOver={() => {
              handleSetHovered(i);
            }}
            onMouseOut={() => {
              // if user already rated then set rating after hover 
              handleSetHovered(rated);
            }}
            onClick={() => {
              handleSetRated(i);
            }}
            className={i <= hoverd ? styles.hovered : ""}
          >
            ★
          </span>
        ))}
      </div>
      {/* <button onClick={() => handleReset()}>Reset Rating</button> */}
    </div>
  );
}