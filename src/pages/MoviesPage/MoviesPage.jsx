import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../сomponents/MovieList/MovieList';
import fetchMovies from '../../сomponents/api';

function MoviesPage() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();
  const value = params.get('query') ?? '';

  const movieQuery = `https://api.themoviedb.org/3/search/movie?query=${value}&include_adult=false&language=en-US&page=1`;

  useEffect(() => {
    async function searchMovies() {
      try {
        const response = await fetchMovies(movieQuery);
        setMovies(response.results);
        console.log(response.results);
      } catch (error) {
        console.log(error);
      }
    }
    searchMovies();
  }, [movieQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setParams({ query: e.target.query.value });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <input
          type="text"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        <MovieList data={movies || []} />
      </ul>
    </div>
  );
}

export default MoviesPage;
