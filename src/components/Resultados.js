import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, Navigate } from "react-router-dom";
import noPoster from "../img/no-poster.png"


function Resultados(props) {
  const token = sessionStorage.getItem('token');
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get('keyword');
  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=c963b2c1865802b4fc57f70679b6a724&query=${keyword}`;
    axios
      .get(endPoint)
      .then(response => {
        const movieArray = response.data.results;
        setMoviesResults(movieArray);
      })
      .catch(error => {
        console.log('Hay un error');
      });
  }, [keyword]);

  const isMovieInFavorites = (movieId) => {
    return props.favorites.find(fav => fav.id === movieId);
  };


  return (
    <>
      {!token && <Navigate to='/login' />}
      <h2>Resultados para: <em>{keyword}</em> </h2>
      {moviesResults.length === 0 && <h2>No hay resultados</h2>}
      <div className="row">
        {moviesResults.map((oneMovie, id) => {
          const isFavorite = isMovieInFavorites(oneMovie.id);

          return (
            <div className="col-2" key={id}>
              <div className="card">
                {oneMovie.poster_path?(
                <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="Poster" />
              ):(
                <img src={noPoster} className="img-fluid" alt='Logo no encontrado' />
              )}
                <button
                  onClick={props.addOrRemoveFav}
                  className="favorite-btn"
                  data-movie-id={oneMovie.id}
                >
                  {isFavorite ? '❤️' : '🖤'}
                </button>
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title.substring(0, 40)}</h5>
                  <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-dark">Ver detalles</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Resultados;
