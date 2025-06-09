import { Link } from 'react-router-dom';

{movies.map((movie) => (
  <li key={movie.id} className={css.item}>
    <Link to={`/movies/${movie.id}`} state={{ from: location }} className={css.link}>
      <img
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : 'https://via.placeholder.com/300x450?text=No+Poster'
        }
        alt={movie.title}
        className={css.poster}
      />
      <h2 className={css.title}>{movie.title}</h2>
    </Link>
  </li>
))}