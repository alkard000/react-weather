import React from 'react';

import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {Icon} from 'leaflet';

import PropTypes from 'prop-types';



const Mapa = ({resultado}) => {

    const {name, coord, weather} = resultado;



    if(!name) return null;

    const position = [coord.lat, coord.lon];
    const image = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`
    const marcador = 'https://www.kindpng.com/picc/b/23/235395.png'
    const icon = new Icon({
        iconUrl : marcador,
        iconSize : [13.76, 24]
    })

    return (
        <Map center={position} zoom={10}>
            <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker 
                position={position}
                icon={icon}
            >
                <Popup>
                    <div>{name}</div>
                    <img src={image} alt="imagen" width="100%"/>
                    <div>{weather[0].description}</div>
                </Popup>
            </Marker>
        </Map>
    );
}

Mapa.propTypes = {
    resultado : PropTypes.object.isRequired,
}
 
export default Mapa;