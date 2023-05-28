import { Spinner } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

function Trailer() {
  const [trailer, setTrailer] = useState(null);
  const [resultado, setResultado] = useState(null);
  const movieID = new URLSearchParams(window.location.search).get('movieID');

  useEffect(() => {
    const fetchTrailerData = async () => {
      try {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=c963b2c1865802b4fc57f70679b6a724&language=es-ES`;
        const response = await axios.get(endPoint);
        const movieDataTrailer = response.data;
        setTrailer(movieDataTrailer);
      } 
      catch (error) {
        console.log('Hay un error cargando el trailer:', error);
      }
    };
    fetchTrailerData();
  }, [movieID]);

  useEffect(() => {
    let tempResultado = null;
    if (trailer) {
      for (let key in trailer.results) {
        if (trailer.results[key].type === 'Trailer') {
          tempResultado = trailer.results[key].key;
          break;
        }
      }
    }
    setResultado(tempResultado);
  }, [trailer]);

  return (
    <>
      {!trailer && (
        <div>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
          />
          <h2>Cargando video...</h2>
        </div>
      )}
      {resultado && (
        <iframe
          width="1221"
          height="480"
          src={`https://www.youtube.com/embed/${resultado}`}
          title="Trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        style={{marginBottom:'10px'}}></iframe>
      )}
    </>
  );
}

export default Trailer;
