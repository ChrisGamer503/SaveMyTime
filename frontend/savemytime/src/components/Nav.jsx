import { useState } from 'react';
import '../styles/calendarStyles.css';
import "../styles/nav.css"
import Modal from './Modal';
function Nav() {
  
  
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDateSelectable, setIsDateSelectable] = useState(true);
  
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
            <p onClick={handleCreateReminderClick}>Crear recordatorio</p>
            <p>Mis recordatorios</p>

          </div>
        </div>

        {modalIsOpen && <Modal closeModal={closeModal} selectedDate={selectedDate} isDateSelectable={isDateSelectable}/>}

        </>
    )
}

export default Nav 