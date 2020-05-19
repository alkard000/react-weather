import React, {useEffect, useState, Fragment} from 'react';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';
import Mapa from './components/Mapa';

function App() {

  //STATE  DEL FORMULARIO
  const [busqueda, setBusqueda] = useState({
      ciudad : '',
      pais : ''
  });
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  const {ciudad, pais} = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {

      if(consultar){
        const AppID = 'fd863e3c73a2633cbab676b6f7554358';

        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&lang=es&appid=${AppID}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsultar(false);


        //DETECTAR SI HUBO RESULTADOS CORRECTOS
        if(resultado.cod === '404'){
          setError(true);
        } else {
          setError(false);
        }
      }
     
    }
    consultarAPI();
  }, [consultar, ciudad, pais]);

  let componente;

  if(error){
    componente = <Error mensaje="No hay resultados"/>
  } else {
    componente = <Clima resultado={resultado} />
  }

  let mapa;

  if(error){
    mapa = <Error mensaje="No hay resultados"/>
  } else {
    mapa = <Mapa resultado={resultado} />
  }

  return (
    <Fragment>
      <Header
        titulo='Clima React App'
      />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                setBusqueda={setBusqueda}
                setConsultar={setConsultar}
              />
              {mapa}
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
    
  );
}

export default App;
