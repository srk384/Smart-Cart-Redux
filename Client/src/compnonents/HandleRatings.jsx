import { IoMdStar, IoMdStarHalf } from "react-icons/io";


export const HandleRatings = (rating) => {
  const count = rating.stars;
  if (typeof count !== "number" || isNaN(count) || count < 0 || count > 5)
    return [];

  const floorCount = Math.floor(count);
  const hasHalf = count % 1 !== 0;

  const stars = [];

  for (let i = 0; i < floorCount; i++) {
    stars.push(<IoMdStar key={`star-full-${i}`} />);
  }

  if (hasHalf) {
    stars.push(<IoMdStarHalf key="star-half" />);
  }

  return stars;
};
