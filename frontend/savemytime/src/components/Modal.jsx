// Modal.js
import React from 'react';
import '../styles/stylesModal.css';

const Modal = ({ closeModal, selectedDate }) => {
  return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>&times;</span>
          <h2>Formulario para {selectedDate}</h2>
          <form>
            <label>
              Evento:
              <input type="text" name="event" />
            </label>
            <button type="submit">Guardar</button>
          </form>
        </div>
      </div>
    )
};

export default Modal;