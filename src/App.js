import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

export default function App() {


  //console.log(getRandomInt(10))

  const [pais, setPais] = useState({})
  const [paises, setPaises] = useState([])
  const [paisAdivinado, setPaisAdivinado] = useState('')
  const [puntos, setPuntos] = useState(0)



  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`)  // acá hacemos la consulta de axios a la API
      setPaises(response.data.data) // la data devuelta de la consulta la almacenamos en la variable movie     
    }
    fetchData() // ejecutamos la función de búsqueda de datos
  }, [])


  function seleccionarPaisRandom(paises) {
    const randomNum = Math.floor(Math.random() * paises.length);
    setPais(paises[randomNum])
  }


  const handleSubmit = (e) => {
    seleccionarPaisRandom(paises)//no va aca
    e.preventDefault()
    if (pais.name.toLowerCase() === paisAdivinado.toLowerCase()) {
      setPuntos(puntos + 10)
      alert("Perfect!")
    }
    else {
      setPuntos(puntos - 1)
      alert(`Wrong! the right answer was ${pais.name}`)
    }
  }

  return (
    <div class="center">
    <h1>Guess the flag!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <img alt="..." width="500px" height="auto" src={pais.flag}></img>
          <div class="input">
              <input
                id="nombrePais"
                type="text"
                name="nombrePais"
                required="required"
                onChange={(e) => setPaisAdivinado(e.target.value)}
              />
            <button type="submit" className="u-full-width button-primary">
              Guess
            </button>
            
          </div>
          <h1>You have {puntos} points</h1>
        </div>
      </form>
    </div>
  )

}