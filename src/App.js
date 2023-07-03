import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

export default function App() {


  //console.log(getRandomInt(10))
  const [paises, setPaises] = useState([])
  const [pais, setPais] = useState({})
  const [paisAdivinado, setPaisAdivinado] = useState('')
  const [puntos, setPuntos] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`https://countriesnow.space/api/v0.1/countries/flag/images`)  // acá hacemos la consulta de axios a la API
      setPaises(response.data.data)
      seleccionarPaisRandom(response.data.data);
    }
    fetchData() // ejecutamos la función de búsqueda de datos
  }, [])




  function seleccionarPaisRandom(paises) {
    const randomNum = Math.floor(Math.random() * paises.length);
    setPais(paises[randomNum])
    return pais
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (pais.name.toLowerCase() === paisAdivinado.toLowerCase()) {
      setPuntos(puntos + 10)
      alert("Perfect!")
    }
    else {
      setPuntos(puntos - 1)
      alert(`Wrong! the right answer was ${pais.name}`)
    }

    seleccionarPaisRandom(paises)
    setPaisAdivinado("")

  }
  return (

    <div class="wrapper container text-center ">
      <div class="row">
        <h1>Guess the flag!</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div class="row">
          <img alt="..." width="500px" height="auto" src={pais.flag}></img>
        </div>

        <div class="row">
          <div class="form">
            <input id="nombrePais" type="text" name="paisAdivinado" required onChange={(e) => setPaisAdivinado(e.target.value) }/>
              <label for="text" class="label-name">
                <span class="content-name">
                  Your guess
                </span>
              </label>
          </div>
          </div>

          <div class="row">
          <button type="submit" class="glow-on-hover" >
            Guess
          </button>
          </div>
        <div class="row">
          <h1>You have {puntos} points</h1>
        </div>
      </form>
    </div>
  )

}