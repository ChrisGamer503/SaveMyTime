import { createContext, useState } from "react";

// Crea el contexto
export const RecordatorioContext = createContext();

// Componente proveedor del contexto
export const RecordatorioProvider = ({ children }) => {
  const [recordatorios, setRecordatorio] = useState([]);

  return (
    <RecordatorioContext.Provider value={{ recordatorios, setRecordatorio }}>
      {children}
    </RecordatorioContext.Provider>
  );
};