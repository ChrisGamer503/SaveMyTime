import { useEffect, useState } from 'react';
import '../styles/recordatoriosStyles.css';
import { RxHamburgerMenu } from 'react-icons/rx';
import Nav from '../components/Nav';
import { useSession } from "../hooks/useSession.js";
import axios from 'axios';
import { useRecordatorio } from '../hooks/useRecordatorio.js';
import { FaRegTrashAlt } from "react-icons/fa";


export default function Recordatorios() {

    const [navIsOpen, setNavOpen] = useState(false)
    const { headers, perfil } = useSession()
    const {recordatorios, setRecordatorio} = useRecordatorio()

    const changeNav = () => {
        if (navIsOpen == false) {
          setNavOpen(true)
        } else {
          setNavOpen(false)
        }
    }

    const obtenerRecordatorios = async () =>{
        try {
            
            const { data } = await axios.get(
                "http://localhost:5000/recordatorios",
                {headers}
            );
            setRecordatorio(data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log("Recordatorios: ", recordatorios);
    }, [recordatorios]);
 
    useEffect(() => {
        if (perfil?.id_usuario) {
            obtenerRecordatorios();
        }
    }, [perfil]);

    const recordatoriosFiltrados = recordatorios.filter(recordatorio => recordatorio.usuario_id === perfil?.id_usuario);


    return(

    <div>
        <div className='contenedor'>
        <RxHamburgerMenu className='hamburger' onClick={changeNav} />
        {navIsOpen && <Nav/>}
            <div className="principal">
                <div>
                    <h1>Mis Recordatorios</h1>
                </div>
                <div>
                {
                    recordatoriosFiltrados.length > 0 ? (
                        recordatoriosFiltrados.map((recordatorio, index) => (
                                <RecordatorioComponent key={recordatorio.id_recordatorio} recordatorio={recordatorio} isFirst={index === 0} isLast={index === recordatoriosFiltrados.length - 1}/>
                        ))
                    ) : (
                        <p>No hay recordatorios disponibles</p>
                    )
                }
                </div>
            </div>
        </div>
    </div>
    )
}

const RecordatorioComponent = ({recordatorio, isFirst, isLast}) =>{
    const {headers} = useSession()
    const { recordatorios, setRecordatorio } = useRecordatorio()

    const eliminarRecordatorio = async ()=>{
        try {
            await axios.delete("http://localhost:5000/recordatorios/" + recordatorio.id_recordatorio, {headers})

            const recordatorioEliminado = recordatorios.filter(
                (recordatorioData) => recordatorioData.id_recordatorio !== recordatorio.id_recordatorio
            )

        setRecordatorio(recordatorioEliminado)

        } catch (error) {
            console.log(error)
        }
    }

    return(
    <div className={`recordatorios ${isFirst ? 'first' : ''} ${isLast ? 'last' : ''}`}>
        <p><span>Nombre del recordatorio:</span> {recordatorio.nombre_recordatorio} </p>

        <div className='crud'>
            <FaRegTrashAlt onClick={eliminarRecordatorio} className='delete'/>
        </div>
    </div>
    )
}