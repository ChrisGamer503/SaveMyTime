// Modal.js
import React, { useEffect } from 'react';
import '../styles/stylesModal.css';
import { useForm } from "react-hook-form"
import dayjs from 'dayjs';

const Modal = ({ closeModal, selectedDate, isDateSelectable }) => {

  const { register, handleSubmit, formState:{ errors }, setValue  } = useForm()

  //Validar que dia es hoy
  useEffect(() => {
    // Configura el valor inicial para 'start' solo si selectedDate está definido
    if (selectedDate) {
      setValue('start', selectedDate);
    }
  }, [selectedDate, setValue]);
  //fecha de hoy
  const today = dayjs().format('YYYY-MM-DD');


  const onSubmit = (data) => {
    // Crear un objeto con los datos del formulario
    const formData = {
      start: data.start,
      end: data.end,
      title: data.event,
      priority: data.important,
    };
    
    // Aquí puedes hacer lo que necesites con el objeto formData
    console.log(formData);
    // Cerrar el modal después de guardar
    closeModal();
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
                <p>Desde</p><input type="date" min={today} defaultValue={selectedDate || ''} disabled={!isDateSelectable} {...register('start')} />
                <p>Hasta</p><input type="date" min={selectedDate} {...register('end', { required: 'Este campo es obligatorio' })}/>
                {errors.end && <p>{errors.end.message}</p>}
              </div>

              <input 
                type="text" 
                name="event" 
                id='recordatorio' 
                className='input' 
                placeholder='Nombre del recordatorio' 
                {...register('event', { required: 'Este campo es obligatorio' })}  
              />
              {errors.event && <p>{errors.event.message}</p>}

              <select name="important" id="important" {...register('important', { required: 'Este campo es obligatorio' })}>
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
      </div>
    )
};

export default Modal;