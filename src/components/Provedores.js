import axios from "axios";
import { useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";

function Proveedores() {
  const [movie, setMovie] = useState(null);
  const [resultado, setResultado] = useState(null);
  const movieID = new URLSearchParams(window.location.search).get('movieID')

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}/watch/providers?api_key=c963b2c1865802b4fc57f70679b6a724`;
        const response = await axios.get(endPoint);
        const movieDataProvider = response.data;
        setMovie(movieDataProvider);
      } catch (error) {
        console.log("Error al obtener los datos de los proveedores:", error);
      }
    };
    fetchProviderData();
  }, [movieID]);

  useEffect(() => {
    let tempResultado = null;
    if (movie) {
      for (let key in movie.results) {
        if (movie.results[key].type === 'AR') {
          tempResultado = movie.results[key].key;
          break;
        }
      }
    }
    setResultado(tempResultado);
  }, [movie]);

  return (
    <>
      {!movie && (
        <div>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
          />
          <h2>Cargando datos de la película...</h2>
        </div>
      )}
      {resultado && (
        <ul>
          {movie.results[resultado].rent.map((provider) => (
            <li key={provider.provider_id} className="col-4 logosProductoras">
              <img
                src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}
                className="logo"
                alt="Logo no encontrado"
              />
              <h5>{provider.provider_name}</h5>
              <a href={provider.link}>Ver enlace</a>
              <p>{provider.logo_path}</p> {/* Obtener logo_path */}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Proveedores;
