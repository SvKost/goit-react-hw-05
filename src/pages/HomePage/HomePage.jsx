const HomePage = ({ movies }) => {
  return (
    <div>
      <h1>Tranding Today</h1>

      <ul>
        {movies.map((movie) => {
          return <li key={movie.id}>{movie.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default HomePage;
