import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Buscador() {
  const [showPopover, setShowPopover] = useState(false);
  const navigate = useNavigate();

  const submitHandler = e => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value;
    if (keyword.trim().length === 0) {
      setShowPopover(true);
    } else {
      setShowPopover(false);
      e.currentTarget.keyword.value=''
      navigate(`/resultados?keyword=${keyword}`);
    }
  };
  
  return (
    <form className="d-flex" onSubmit={submitHandler}>
      <label>
        <input
          className="form-control me-2"
          type="text"
          placeholder="Buscar película"
          aria-label="Search"
          name="keyword" 
        />
      </label>
      <button className="btn btn-outline-success" type="submit">
        Buscar
      </button>
      
      {showPopover && (
        <div className="alert alert-primary" role="alert" style={{position:"fixed", marginTop:'50px'}}>
          Debes ingresar datos para realizar la búsqueda de la película.
        </div>
      )}
    </form>
  );
}

export default Buscador;
