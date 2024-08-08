import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useState } from 'react';
import Modal from '../components/Modal';
import '../styles/stylesModal.css';
import '../styles/calendarStyles.css';
import Nav from '../components/Nav';


dayjs.locale('es');

function Calendario() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [navIsOpen, setNavOpen] = useState(false)

  const handleDayClick = (slotInfo) => {
    const { start } = slotInfo;
    if (dayjs(start).isAfter(dayjs())) {
      const formattedDate = dayjs(start).format('LL');
      setSelectedDate(formattedDate);
      setModalIsOpen(true);
      console.log(selectedDate)
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedDate(null);
  };

  const localizer = dayjsLocalizer(dayjs);

  return (
    <div>
      
      <div
        style={{
          width: '100%',
          height: '95vh',
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        
        {
         <Nav/>
        }

        <Calendar
          localizer={localizer}
          views={['month', 'week', 'agenda']}
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