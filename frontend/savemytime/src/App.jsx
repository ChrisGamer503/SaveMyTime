import { Calendar, dayjsLocalizer } from "react-big-calendar"
import "react-big-calendar/lib/css/react-big-calendar.css"
import dayjs from "dayjs"

function App() {

  const localizer = dayjsLocalizer(dayjs)
  return(
  <div style={{
    width: "75%",
    height: "95vh"
  }}>
    <Calendar 
      localizer={localizer}
      

    />
  </div>
)

}

export default App