import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Trailer from "./Trailer";
import noLogoImage from "../img/no-logo.png";
import noPoster from "../img/no-poster.png"

function Detalle(props) {
  let token = sessionStorage.getItem('token');

  let query = new URLSearchParams(window.location.search);
  let movieID = query.get('movieID');

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=c963b2c1865802b4fc57f70679b6a724&language=es-ES`;
    axios.get(endPoint).then(response => {
      const movieData = response.data;
      setMovie(movieData);
    })
    .catch(error => {
      console.log('Hay un error:', error);
    });
  }, [movieID]);

  const isMovieInFavorites = (movieId) => {
    return props.favorites.find(fav => fav.id === movieId);
  };


  return (
    <>
      <div class="btn-group" style={{width:'30%'}} role="group" aria-label="Basic mixed styles example">
        <Link to='/' style={{ margin: '10px 0px 10px 0px' }} className="btn btn-dark col-4">Inicio</Link>
        <Link to='/listado' style={{ margin: '10px 0px 10px 0px' }} className="btn btn-dark col-4">Top 20</Link>
      </div>
      
      {!token && <Navigate to='/login' />}
      {!movie && (
        <div>
          <Spinner thickness='4px'
            speed='0.65s'
            emptyColor='gray.200'
            color='red.500'
            size='xl'
          />
          <h2>Cargando datos de la película...</h2>
        </div>
      )}

      {movie && (
        <div style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
          <div className="row" style={{ backgroundColor: `rgba(252, 252, 252, 0.649)`, color: 'black' }}>
            <h2 style={{ textDecoration: 'underline' }}>{movie.title}</h2>
            
            <div className="col-4 img-detail">        
              {movie.poster_path?(
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="img-fluid" alt="Poster" />
              ):(
                <img src={noPoster} className="img-fluid" alt='Logo no encontrado' />
              )}
            </div>
            <div className="col-8">
            <button
              onClick={props.addOrRemoveFav}
              className="favorite-btn-detail"
              data-movie-id={movie.id}
            >
              {isMovieInFavorites(movie.id) ? '❤️' : '🖤'}
            </button>
            <h3>Sinopsis:</h3><p>{movie.overview}</p>
              <h3>Géneros:</h3>
              <ul>
                {movie.genres.map(genero => <li key={genero.id}>{genero.name}</li>)}
              </ul>
              <h3>Compañias Productoras: </h3>
              <ul className="row" style={{ listStyleType: 'none' }}>
              {movie.production_companies.map(companies => (
                <li key={companies.id} className="col-4 logosProductoras">
                  {companies.logo_path ? (
                    <img src={`https://image.tmdb.org/t/p/w500/${companies.logo_path}`} className="logoProductora" alt='Logo no encontrado' />
                  ) : (
                    <img src={noLogoImage} className="logoProductora" alt='Logo no encontrado' />
                  )}<br></br>
                  <h5>{companies.name}</h5>
                </li>
              ))}
              </ul>
              <h3>Fecha de estreno:</h3><h5>{movie.release_date}</h5>
              <h3>Duración:</h3><h5>{movie.runtime} minutos</h5>
              <h3>Página web:</h3><a href={movie.homepage}>{movie.homepage}</a> <br/>
            </div>

            <h3 style={{ textAlign: 'center' }}>{movie.tagline}</h3>
            
            <Trailer />
          </div>
        </div>
      )}

      <br />
      <div class="btn-group" style={{width:'30%'}} role="group" aria-label="Basic mixed styles example">
        <Link to='/' style={{ margin: '10px 0px 10px 0px' }} className="btn btn-dark col-4">Inicio</Link>
        <Link to='/listado' style={{ margin: '10px 0px 10px 0px' }} className="btn btn-dark col-4">Top 20</Link>
      </div>    </>
  );
}

export default Detalle;
