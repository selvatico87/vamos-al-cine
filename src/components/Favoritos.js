import { Link } from "react-router-dom";
import { Navigate } from "react";

function Favoritos(props) {
  const token = sessionStorage.getItem('token');

  const handleRemoveFav = (e, movieId) => {
    e.stopPropagation(); // Detiene la propagación del evento para evitar conflictos
    props.addOrRemoveFav(e, movieId); // Llama a la función addOrRemoveFav del componente padre pasando el evento y el id de la película
  };

  return (
    <>
      {!token && <Navigate to='/login' />}
      <h2>Favoritos</h2>
      <div className="row">
        {!props.favorites.length && <div className="col-12">No hay nada en la sección de favoritos</div>}
        {props.favorites.map((oneMovie) => {
          return (
            <div className="col-4" key={oneMovie.id}>
              <div className="card">
                <img src={oneMovie.imgURL} className="card-img-top" alt="..." />
                <button
                  onClick={(e) => handleRemoveFav(e, oneMovie.id)} // Invoca la función handleRemoveFav con el evento y el id de la película al hacer clic en el botón
                  className="favorite-btn"
                  data-movie-id={oneMovie.id}
                >
                  {'❤️'}
                </button>
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title.substring(0, 40)}</h5>
                  <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-dark">Ver detalles</Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Favoritos;
