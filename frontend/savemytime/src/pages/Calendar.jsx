import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import '../styles/stylesModal.css';
import '../styles/calendarStyles.css';
import Nav from '../components/Nav';
import { RxHamburgerMenu } from "react-icons/rx"
import { useSession } from "../hooks/useSession.js";
import axios from 'axios';
import { useRecordatorio } from '../hooks/useRecordatorio.js';
import { useNavigate } from 'react-router-dom';

dayjs.locale('es');

function Calendario() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [navIsOpen, setNavOpen] = useState(false)
  const { headers, perfil } = useSession();
  const {recordatorios, setRecordatorio} = useRecordatorio()
  const [view, setView] = useState('month');
  const navigate = useNavigate();

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

  const handleEventClick = (event) => {
    navigate('/recordatorios'); // Redirige a /recordatorios al hacer clic en un evento
  };

  const customShowMore = () => {
    setView('agenda');
  };

  const localizer = dayjsLocalizer(dayjs);

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

  const getColorByPriority = (prioridad) => {
    switch (prioridad) {
      case 'alta':
        return '#DE2E31';
      case 'Media':
        return 'orange';
      case 'Baja':
        return '#3FC55A';
      default:
        return '#DE2E31'; // Color por defecto
    }
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color || 'blue'; // Usa el color asignado o azul por defecto
    return {
      style: {
        backgroundColor,
        color: 'white',
        border: 'none',
      },
    };
  };


  useEffect(() => {
    if (perfil?.id_usuario) {
        obtenerRecordatorios();
    }
  }, [perfil]);

  const recordatoriosFiltrados = recordatorios.filter(recordatorio => recordatorio.usuario_id === perfil?.id_usuario);

  const eventos = recordatoriosFiltrados.map(recordatorio => ({
    title: recordatorio.nombre_recordatorio,
    start: new Date(recordatorio.fecha_inicio),
    end: new Date(recordatorio.fecha_final),
    allDay: true,
    prioridad: recordatorio.prioridad,
    id_recordatorio: recordatorio.id_recordatorio, // Incluye el id del recordatorio para usarlo en la navegación
    color: getColorByPriority(recordatorio.prioridad),
  }));

  


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
          view={view}
          onView={(newView) => setView(newView)}
          events={eventos}
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
            showMore: (total) => `+${total} MÁS`,
          }}
          
          eventPropGetter={eventStyleGetter} // Usa el prop eventPropGetter
          style={{ width: '100%' }}
          selectable
          onSelectSlot={handleDayClick}
          startAccessor="start"
          endAccessor="end"
          onShowMore={customShowMore}
          onSelectEvent={handleEventClick} // Añade el evento onSelectEvent
        />

        {
          modalIsOpen &&  <Modal closeModal={closeModal} selectedDate={selectedDate} />
        }
       
      </div>
    </div>
  );
}

export default Calendario;