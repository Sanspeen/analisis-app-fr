import React from 'react'
import { Link } from 'react-router-dom';


export default function SeriesAndErrors() {
    
    const solve = () =>{
        alert("No se")
    }

    return (
        <div>
            <Link to="/"><button>{"<-"}</button></Link>
            <h1>Series de Taylor y errores</h1>
            <Link><button onClick={solve}>Confirmar que se hacia aqui xD</button></Link>
        </div>
    )
}
