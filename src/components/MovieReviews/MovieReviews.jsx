const MovieReviews = ({ movieReviews }) => {
  return (
    <div>
      <ul>
        {movieReviews !== null && movieReviews.length !== 0 ? (
          movieReviews.map((review) => (
            <li key={review.id}>
              <p>Author: {review.author}</p>
              <p>{review.content}</p>
            </li>
          ))
        ) : (
          <p>Sorry, there are no reviews for this film.</p>
        )}
      </ul>
    </div>
  );
};

export default MovieReviews;
