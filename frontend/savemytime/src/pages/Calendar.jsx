import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useState } from 'react';
import Modal from '../components/Modal';
import '../styles/stylesModal.css';
import '../styles/calendarStyles.css';
import Nav from '../components/Nav';
import { RxHamburgerMenu } from "react-icons/rx"
import { useSession } from "../hooks/useSession.js";


dayjs.locale('es');

function Calendario() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [navIsOpen, setNavOpen] = useState(false)
  const { headers, logout } = useSession();

  const handleDayClick = (slotInfo) => {
    const { start } = slotInfo;
    const today = dayjs().startOf('day');

    if (dayjs(start).isSameOrAfter(today)) {
      const formattedDate = dayjs(start).format('YYYY-MM-DD');
      setSelectedDate(formattedDate);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDate(null);
  };

  const changeNav = () => {
    if (navIsOpen == false) {
      setNavOpen(true)
    } else {
      setNavOpen(false)
    }
  }

  const localizer = dayjsLocalizer(dayjs);

  

  return (
    <div>
      <RxHamburgerMenu className='hamburger' onClick={changeNav} />
      <div
        style={{
          width: '100%',
          height: '95vh',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        
        {
         navIsOpen && <Nav/>
        }

        <Calendar
          localizer={localizer}
          views={['month', 'agenda']}
          messages={{
            next: 'Siguiente',
            previous: 'Anterior',
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana',
            day: 'Día',
            agenda: 'Agenda',
            date: 'Fecha',
            time: 'Hora',
            event: 'Evento',
            noEventsInRange: 'Sin eventos',
            
          }}
          style={{ width: '100%' }}
          selectable
          onSelectSlot={handleDayClick}
          startAccessor="start"
          endAccessor="end"
        />

        {
          modalIsOpen &&  <Modal closeModal={closeModal} selectedDate={selectedDate} />
        }
       
      </div>
    </div>
  );
}

export default Calendario;