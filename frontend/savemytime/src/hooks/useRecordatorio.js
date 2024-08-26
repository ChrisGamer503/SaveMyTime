import { useContext } from "react"
import { RecordatorioContext } from "../context/RecordatorioContext"

const useRecordatorio = ()=>{
    return useContext(RecordatorioContext)
}

export {useRecordatorio}