import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ListaGeneral(props) {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const fetchData = (page) => {
    const endPoint = `http://api.themoviedb.org/3/discover/movie?api_key=c963b2c1865802b4fc57f70679b6a724&language=es-ES&page=${page}`;
    axios
      .get(endPoint)
      .then((response) => {
        const apiData = response.data;
        setMovieList(apiData.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
        <div className="pagination" >
        {Array.from({ length: 15 }, (_, index) => index + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
        </div>
      <div className="row">
        {movieList.map((oneMovie) => {
          return (
            <div className="col-4" key={oneMovie.id}>
              <div className="card">
                <div className="div_card-img-top">
                  <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} className="card-img-top" alt="..." />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title.substring(0, 40)}</h5>
                  <Link to={`/detalle?movieID=${oneMovie.id}`} className="btn btn-dark">
                    Ver detalles
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pagination">
        {Array.from({ length: 15 }, (_, index) => index + 1).map((pageNumber) => (
          <button key={pageNumber} onClick={() => handlePageChange(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    </>
  );
}

export default ListaGeneral;
