import React, { useEffect, useState } from "react";
import {countries} from '../data/paises.js'
import './clima.css'

const Clima = ()=>{
    
    const [clima, setClima] = useState({})
    const [isLoad,setIsLoad] = useState(false)

    async function consumeApi(pais,codigo){
        if(codigo!=0){
            const response = await fetch(`${import.meta.env.VITE_URL}${pais},${codigo}&APPID=${import.meta.env.VITE_API}`,{
                method:"GET"
            })
            if(response.ok){
                const res = await response.json()
                console.log(res);
                setClima(res)
                setIsLoad(true)
            }
        }
        
    }

    const seleccionarPais =(e)=>{
        const nombre = e.target.options[e.target.selectedIndex].textContent
        const {value} = e.target
        consumeApi(nombre,value)
    }

    return(
        <div className="clima-content">
            <h1 className="clima-title">Clima App</h1>
            <select name="" id="" onChange={ seleccionarPais } className="clima-select" >
                <option value="0" title="0" className="clima-option">Seleccionar</option>
                {
                    countries.map((valor,index)=>(
                        <option className="clima-option" title={ valor.capital } key={index} value={valor.code}>{valor.country}</option>
                    ))
                }
            </select>
            { isLoad && <ClimaCard objeto={ clima }/> }

        </div>
    )
}

const ClimaCard = ({objeto})=>{
    return( 
        <>
            <h2 className="clima-subtitle">{objeto.name}</h2>
            <div className="clima-container">
                <div className="clima-map-content">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d7991103.140067708!2d-77.05!3d-12.05!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses-419!2spe!4v1678138296247!5m2!1ses-419!2spe" lang="es" width="100%" height="100%" loading="lazy"></iframe>
                    <span className="clima-frame-ref">Imagen solo de referencia</span>
                </div>
                <div className="clima-atrr">
                    <div className="clima-atrr-item1">
                        <span>Grados °F: {objeto.wind.deg}°</span><span>Humedad:{objeto.main.humidity}</span><span>Coors: {objeto.coord.lat}/{objeto.coord.lon}</span>
                    </div>
                    <div className="clima-atrr-item2">
                        <span>Temperatura: {objeto.main.temp}</span><span>Presuracion: {objeto.main.pressure}</span><span>Temperaturas: {objeto.main.temp_max}-{objeto.main.temp_min}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Clima
