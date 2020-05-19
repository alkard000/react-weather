import React from 'react';
import PropTypes from 'prop-types';


const Paises = ({code, name}) => {

    return (  
        <option value={code}>{name}</option>
    );
}

Paises.propTypes = {
    code : PropTypes.string.isRequired,
    name : PropTypes.string.isRequired
}
 
export default Paises;