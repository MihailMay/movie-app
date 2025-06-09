import { useEffect, useState } from 'react';
import { useParams, Outlet, useLocation, Link } from 'react-router-dom';
import { fetchMovieById } from '../../services/api';
import css from './MovieDetails.module.css';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieById(movieId);
        setMovie(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [movieId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!movie) return null;

  const backLink = location.state?.from ?? '/movies';

  return (
    <div className={css.container}>
      <Link to={backLink} className={css.backLink}>
        ← Go back
      </Link>

      <div className={css.movieCard}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={css.poster}
        />
        <div className={css.info}>
          <h1 className={css.title}>
            {movie.title} ({new Date(movie.release_date).getFullYear()})
          </h1>
          <p className={css.score}>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h2 className={css.subtitle}>Overview</h2>
          <p className={css.overview}>{movie.overview}</p>
          <h2 className={css.subtitle}>Genres</h2>
          <p className={css.genres}>
            {movie.genres.map((genre) => genre.name).join(', ')}
          </p>
        </div>
      </div>

      <div className={css.additionalInfo}>
        <h2 className={css.subtitle}>Additional information</h2>
        <ul className={css.linksList}>
          <li>
            <Link to="cast" state={{ from: backLink }} className={css.link}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLink }} className={css.link}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetails;