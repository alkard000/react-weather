import React from 'react';

import PropTypes from 'prop-types';


const Clima = ({resultado}) => {

    //EXTRAER DATOS 
    const {name, main, weather} = resultado;

    //const image = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    if(!name) return null;

    //GRADOS KELVIN A CENTIGRADOS
    const kelvin = 273.15

    const image = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

    return (  
        <div className="card-panel white col s12">
            <div className="black-text">
                <h2>El clima de {name} es : </h2>

                <p className="temperatura">
                    {parseFloat(main.temp - kelvin, 10).toFixed(2)}
                    <span>&#x2103;</span>
                    <img className="imagen" src={image} alt="imagen"/>
                </p>
                <p>Temperatura maxima : 
                    {parseFloat(main.temp_max - kelvin, 10).toFixed(2)}
                    <span>&#x2103;</span>
                </p>
                <p> Temperatura minima : 
                    {parseFloat(main.temp_min - kelvin, 10).toFixed(2)}
                    <span>&#x2103;</span>
                </p>
                <p>Humedad  :
                    <span>{main.humidity} %</span>
                </p>
            </div>
        </div>
    );
}
 
Clima.propTypes = {
    resultado : PropTypes.object.isRequired,
}

export default Clima;