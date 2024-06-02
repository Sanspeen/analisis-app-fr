import React from 'react'
import { Link } from 'react-router-dom';

export default function CerosPage() {
    return (
        <div>
            <Link to="/"><button>{"<-"}</button></Link>
            <h1>Ceros</h1>
            <Link><button>Biseccion</button></Link>
            <Link><button>Newton</button></Link>
            <Link><button>Secante</button></Link>
            <Link><button>Falsa posicion</button></Link>
            <Link><button>Metodo grafico</button></Link>
        </div>
    )
}
