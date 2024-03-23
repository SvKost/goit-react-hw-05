import { useParams } from "react-router-dom";

const MovieCast = ({ movieCredits }) => {
  // const { movieId } = useParams();
  // console.log(movieId);
  return (
    <div>
      <ul>
        {movieCredits.cast !== null &&
          movieCredits.cast.map((item) => (
            <li key={item.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                alt={`Photo of ${item.original_name}`}
              />
              <p>{item.original_name}</p>
              <p>Character: {item.character}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieCast;
