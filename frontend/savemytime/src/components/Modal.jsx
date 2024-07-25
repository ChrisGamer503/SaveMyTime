// Modal.js
import React from 'react';
import '../styles/stylesModal.css';
import { useForm } from "react-hook-form"

const Modal = ({ closeModal, selectedDate }) => {

  const { register, handleSubmit, formState } = useForm()

  return (
      <div className="modal">
        <div className="modal-content">
          <div className='close_box'>
            <span className="close" onClick={closeModal}>&times;</span>
          </div>
          
          <div className='form_box'>
            <h2>{selectedDate}</h2>
            <form>
              <label htmlFor='recordatorio'>
                Recordatorio
              </label>
              <input type="text" name="event" id='recordatorio' className='input' placeholder='Nombre del recordatorio'/>
              <button type="submit" className='button_save'>Guardar</button>
            </form>
          </div>
        </div>
      </div>
    )
};

export default Modal;