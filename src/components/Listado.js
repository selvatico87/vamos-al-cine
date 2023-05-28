import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";


function Listado(props) {
  const token = sessionStorage.getItem('token');
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    const endPoint = 'http://api.themoviedb.org/3/discover/movie?api_key=c963b2c1865802b4fc57f70679b6a724&language=es-ES';
    axios
      .get(endPoint)
      .then(response => {
        const apiData = response.data;
        setMovieList(apiData.results);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const isMovieInFavorites = (movieId) => {
    return props.favorites.find(id => id.id === movieId);
  };

  return (
    <>
      {!token && <Navigate to='/login' />}
      <div className="row">
        {movieList.map((oneMovie) => {
          const isFavorite = isMovieInFavorites(oneMovie.id);

          return (
            <div className="col-3" key={oneMovie.id}>
              <div className="card">
                <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" style={{width:'100%', height:'400px'}} alt="..." />
                <h2 className="position-top-movies">{movieList.indexOf(oneMovie)+1}</h2>
                <button
                  onClick={props.addOrRemoveFav}
                  className="favorite-btn"
                  data-movie-id={oneMovie.id}
                >
                {isFavorite ? '❤️' : '🖤'}
                </button>
                <div className="card-body">
                  <div style={{height:'30px', width:'100%', marginBottom:'10px'}}>
                    <h5 className="card-title" style={{fontSize:'1em', display:'flex', textAlign:'center'}}>{oneMovie.title.substring(0, 40)}</h5>
                  </div>
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

export default Listado;
