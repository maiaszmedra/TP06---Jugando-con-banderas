import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

export default function App() {


  //console.log(getRandomInt(10))

  const [pais, setPais] = useState({})
  const [paises, setPaises] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`)  // acá hacemos la consulta de axios a la API
      setPaises(response.data.data) // la data devuelta de la consulta la almacenamos en la variable movie
      seleccionarPaisRandom(response.data.data)
    }
    fetchData() // ejecutamos la función de búsqueda de datos

  },[])

  
  function seleccionarPaisRandom(paises) {
    const randomNum =  Math.floor(Math.random()* paises.length);
    setPais(paises[randomNum])
  }
 console.log(pais)

  return (
    <div>
      
    </div>

  )
}

