import React, {useEffect, useState} from 'react';

import Error from './Error';
import Paises from './Paises';

import PropTypes from 'prop-types';

const Formulario = ({busqueda, setBusqueda, setConsultar}) => {

    const [error, setError] = useState(false);
    //const [consultas, setConsultas] = useState(false);
    const [paises, setPaises] = useState([]);


    useEffect(() => {
        const consultarAPI = async () => {

            const url = 'https://restcountries.eu/rest/v2/';

            const respuesta = await fetch(url);
            const paises = await respuesta.json();


            setPaises(paises);
            //setConsultas(true);
        
        }
        consultarAPI();
    }, []);

    //EXTRAER CIUDAD Y PAIS
    const {ciudad, pais} = busqueda;

    //FUNCION PARA COLOCAR LOS ELEMENTOS EN EL STATE
    const handleChange = e => {
        //ACTUALIZAR EL STATE
        setBusqueda({
            ...busqueda,
            [e.target.name] : e.target.value
        });
    }

    //CUANDO EL USUSARIO DA SUBMIT
    const handleSubmit = e => {
        e.preventDefault();

        //VALIDAR
        if(ciudad.trim() === '' || pais.trim() === ''){
            setError(true);
            return
        }
        setError(false);

        //PASARLO AL COMPONENTE PRINCIPAL
        setConsultar(true);
    }


    return (  
        <form
            onSubmit={handleSubmit}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios' /> : null}

            <div className="input-field col s12">
                <input
                    type='text'
                    name='ciudad'
                    id='ciudad'
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor='ciudad'>Ciudad : </label>
            </div>

            <label className="label-paises" htmlFor='pais'>Pais : </label>
            <select
                className="browser-default select-paises"
                name='pais'
                id='pais'
                value={pais}
                onChange={handleChange}
            >
            <option value="">-- Seleccione --</option>
            {paises.map(country => ( //LOS "()" SIMULAN UN RETURN
                <Paises
                    key={country.name}
                    name={country.name}
                    code={country.alpha2Code}
                />
            ))}
            </select>

            <div className="input-field col s12">
                <input 
                    type="submit"
                    value='Buscar Clima'
                    className='waves-effect waves-light btn-large yellow accent-4'
                />
            </div>
        </form>
    );
}

Formulario.propTypes = {
    busqueda : PropTypes.object.isRequired,
    setBusqueda : PropTypes.func.isRequired,
    setConsultar : PropTypes.func.isRequired
}
 
export default Formulario;