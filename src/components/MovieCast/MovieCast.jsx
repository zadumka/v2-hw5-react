import { useEffect, useState } from 'react';
import { fetchMovieCast } from '../../api';
import Error from '../Error/Error';
import { useParams } from 'react-router-dom';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchedData() {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(true);
      }
    }

    fetchedData();
  }, [movieId]);

  return (
    <>
      {error && <Error />}
      {!cast.length && <div>This information has not been added yet</div>}
      {cast.length && (
        <ul className={css.list}>
          {cast?.map(({ id, name, character, profile_path }) => (
            <li key={id}>
              <div className={css.imageContainer}>
                {profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                    alt={name}
                  />
                ) : (
                  <div
                    width={240}
                    style={{
                      backgroundColor: 'lightgray',
                      height: 360,
                      width: 240,
                    }}
                  ></div>
                )}
              </div>
              <div className={css.actorDesc}>
                <span className={css.name}>{name}</span>
                <span className={css.character}>{character}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
