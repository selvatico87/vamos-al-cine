//library
import {BrowserRouter as Router, Routes, Route, } from 'react-router-dom'
import { useState, useEffect } from 'react';

//Components
import Login from "./components/Login";
import Listado from './components/Listado';
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';
import Detalle from './components/Detalle';

//Styles
import './css/bootstrap.min.css'
import './css/app.css';

/////////////////////////////////////
let prevScrollPos = window.pageYOffset;

window.onscroll = function() {
  const currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    document.querySelector("header").classList.remove("hidden");
  } else {
    document.querySelector("header").classList.add("hidden");
  }

  prevScrollPos = currentScrollPos;
};

function App() {
  
  const [favorites,setFavorites]=useState([])

  useEffect(()=>{
    const favsInLocal = localStorage.getItem('favs')
    
    if(favsInLocal!==null){
      const favsArray = JSON.parse(favsInLocal)
      setFavorites(favsArray)
    }
  },[])
  
  // const favMovies=localStorage.getItem('favs');
  
  // let tempMoviesFavs;

  // if(favMovies===null){
  //   tempMoviesFavs=[];
  // } else{
  //   tempMoviesFavs=JSON.parse(favMovies);
  // }
  
  const addOrRemoveFav = (e) => {
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const movieId = parseInt(btn.dataset.movieId);
  
    const movieData = {
      imgURL,
      title,
      id: movieId,
    };
  
    const movieInArray = favorites.find((fav) => fav.id === movieId);
  
    if (!movieInArray) {
      const updatedFavorites = [...favorites, movieData];
      localStorage.setItem('favs', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      const updatedFavorites = favorites.filter((fav) => fav.id !== movieId);
      localStorage.setItem('favs', JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    }
  };
  
  return (
    <Router>
      <Header favorites={favorites}/>
      <div className='container mt-3' style={{marginTop:'60px'}}>
        <Routes >
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/listado' element={<Listado favorites={favorites} addOrRemoveFav={addOrRemoveFav}/>}/>
          <Route path='/detalle' element={<Detalle favorites={favorites} addOrRemoveFav={addOrRemoveFav}/>}/>
          <Route path='/resultados' element={<Resultados favorites={favorites} addOrRemoveFav={addOrRemoveFav}/>}/>
          <Route path='/favoritos' element={<Favoritos favorites={favorites} addOrRemoveFav={addOrRemoveFav}/>}/>
        </Routes>
      </div>
      <Footer/> 
    </Router>
  );
}

export default App;
