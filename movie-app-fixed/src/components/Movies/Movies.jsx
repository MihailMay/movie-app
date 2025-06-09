import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/api';
import css from './Movies.module.css';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const query = searchParams.get('query') ?? '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value.trim();

    if (!searchQuery) return;

    try {
      setLoading(true);
      const data = await fetchMoviesByQuery(searchQuery);
      setMovies(data.results);
      setSearchParams({ query: searchQuery });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul className={css.list}>
        {movies.map((movie) => (
          <li key={movie.id} className={css.item}>
            {/* Add your movie card here */}
            {movie.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;