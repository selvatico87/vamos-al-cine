import { Link } from "react-router-dom"
import logo from '../img/logolargofondonegro.png'
import '../css/app.css'
import Buscador from "./Buscador"
import Logout from "./Logout"

function Header(props){
  return (
  <header>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to={'/'}>
          <img src={logo} alt="Logo Vamos al Cine"  className="logoPrincipal d-inline-block align-text-top"/>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 nav-lista">
            <li className="nav-item"><Link className="nav-link active" aria-current="page"  to={'/'}>Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link active" aria-current="page"  to={'/listado'}>Top 20</Link></li>
            <li className="nav-item"><Link className="nav-link active" aria-current="page"  to={'/favoritos'}>Favoritos: <strong>{props.favorites.length}</strong></Link></li>
            {/* <li><Link to={Contacto}>Contacto</Link></li> */}
            <li className="nav-item"><Link className="nav-link active" aria-current="page" to={'/login'}>Ingresar</Link></li>
          </ul>
          <Logout/>
          <Buscador/>
        </div>
      </div>
    </nav>
  </header>
  )
}

export default Header