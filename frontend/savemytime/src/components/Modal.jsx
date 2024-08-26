// Modal.js
import React, { useEffect, useState } from 'react';
import '../styles/stylesModal.css';
import { useForm } from "react-hook-form"
import dayjs from 'dayjs';
import { useSession } from '../hooks/useSession';
import axios from 'axios';

const Modal = ({ closeModal, selectedDate, isDateSelectable }) => {

  const { register, handleSubmit, formState:{ errors }, setValue, watch  } = useForm()
  const { headers, perfil } = useSession()

  const [isEndDateDisabled, setIsEndDateDisabled] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // Estado para el popup


  //Validar que dia es hoy
  useEffect(() => {
    // Configura el valor inicial para 'start' solo si selectedDate está definido
    if (selectedDate) {
      setValue('fecha_inicio', selectedDate);
      setIsEndDateDisabled(false); // Habilitar 'end' si hay una fecha de inicio
    }
  }, [selectedDate, setValue]);
  //fecha de hoy
  const today = dayjs().format('YYYY-MM-DD');

  // Observar el valor de start
  const startDate = watch('fecha_inicio', selectedDate || '');

  useEffect(() => {
    setIsEndDateDisabled(!startDate); // Deshabilitar 'end' si 'start' no tiene valor
  }, [startDate]);


  const onSubmit = async(data) => {
    // Crear un objeto con los datos del formulario
    const formData = {
      fecha_inicio: data.fecha_inicio,
      fecha_final: data.fecha_final,
      nombre_recordatorio: data.nombre_recordatorio,
      prioridad: data.prioridad,
    };
    
    try {
      await axios.post("http://localhost:5000/recordatorios", formData, { headers });
      // Manejar el éxito
      setShowPopup(true);
      setMensaje("Recordatorio Creado");
    } catch (error) {
      setMensaje("Error al crear el recordatorio");
      setError("event", { type: "manual", message: error.response.data.message });
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    closeModal(); // Cerrar el modal cuando se cierra el popup
  };

  return (
      <div className="modal">
        <div className="modal-content">
          <div className='close_box'>
            <span className="close" onClick={closeModal}>&times;</span>
          </div>
          
          <div className='form_box'>
            
            <h2>Recordatorio</h2>
            
            <form className='form' onSubmit={handleSubmit(onSubmit)}>
              
              <div className='form_date'>
                <p>Desde</p>
                <input 
                  type="date" 
                  min={today} 
                  defaultValue={selectedDate || ''} 
                  disabled={!isDateSelectable} 
                  {...register('fecha_inicio')} 
                />

                <p>Hasta</p>
                <input 
                  type="date" 
                  min={startDate} 
                  disabled={isEndDateDisabled}
                  {...register('fecha_final', { required: 'Este campo es obligatorio'})}
                />

                {errors.end && <p>{errors.end.message}</p>}
              </div>

              <input 
                type="text" 
                name="event" 
                id='recordatorio' 
                className='input' 
                placeholder='Nombre del recordatorio' 
                {...register('nombre_recordatorio', { required: 'Este campo es obligatorio' })}  
              />
              {errors.event && <p>{errors.event.message}</p>}

              <select name="important" id="important" {...register('prioridad', { required: 'Este campo es obligatorio' })}>
                <option value="" disabled selected>Seleccione la prioridad</option>
                <option value="Baja" >Prioridad Baja</option>
                <option value="Media">Prioridad Media</option>
                <option value="Alta">Prioridad Alta</option>
              </select>
              {errors.important && <p>{errors.important.message}</p>}

              <button type="submit" className='button_save'>Guardar</button>
            </form>
          </div>
        </div>
        {showPopup && (
        <div className="popup-modal">
          <div className="popup-content-modal">
            <p>Recordatorio creado con éxito</p>
            <button onClick={handlePopupClose}>Cerrar</button>
          </div>
        </div>
      )}
      </div>
    )
};

export default Modal;