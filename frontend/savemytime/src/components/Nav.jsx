import { useState } from 'react';
import '../styles/calendarStyles.css';
import "../styles/nav.css"
import Modal from './Modal';
import { Link } from "react-router-dom";
import { useSession } from '../hooks/useSession';


function Nav() {
  
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateSelectable, setIsDateSelectable] = useState(true);
  const { logout } = useSession();

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDate(null);
  };
  const handleCreateReminderClick = () => {
    setSelectedDate(null); // No hay fecha seleccionada
    setIsDateSelectable(true); // Desactiva la selección de fecha
    setModalIsOpen(true);
  };

    return(

        <>
        <div className='nav'>
          <div className='container_nav'>
            <Link to="/calendar"><p>Agenda</p></Link>
            <p onClick={handleCreateReminderClick}>Crear recordatorio</p>
            <Link to="/recordatorios"><p>Mis recordatorios</p></Link>
            
          </div>
          <button onClick={logout} className='boton'>Cerrar Sesion</button>
        </div>

        {modalIsOpen && <Modal closeModal={closeModal} selectedDate={selectedDate} isDateSelectable={isDateSelectable}/>}
        
        </>
    )
}

export default Nav 