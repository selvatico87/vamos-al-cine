import { Link } from 'react-router-dom';
import '../css/app.css';
import logoGitHub from '../img/github.png'
import logoLinkedin from '../img/linkedin.png'

function Footer(){
  return(
    <footer className='footer bg-dark'>
      <div id="caja-footer">
        <h1>Vamos al Cine</h1><br/>
        <h2>Hecho por <strong>Ignacio González</strong>  <br/>
         como práctica del curso <br/> 
         <strong>Front End con React</strong>  <br/> 
         Mayo 2023</h2><br/>       
      </div>
      <div id="cajita-logos-footer">
          <Link to="https://github.com/selvatico87"><img src={logoGitHub} alt="Logo Github" class="logos-footer"/></Link>
          <Link to="https://www.linkedin.com/in/ignacio-andr%C3%A9s-gonz%C3%A1lez-zorrilla/"><img src={logoLinkedin} alt="Logo Linkedin" class="logos-footer"/></Link>
      </div> 
    </footer>
  )
}

export default Footer