'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField, { OutlinedTextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import React, {useRef, useState} from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function Home() {

  // const reservations = 
  //   [
  //     {
  //         "IdReserva": 2,
  //         "Cliente": "Hospede 1",
  //         "IdImovel": 1,
  //         "NumeroImovel": "TESTE1",
  //         "NomeHotel": "Fiore Prime",
  //         "IdHotel": 1,
  //         "CheckIn": "1/08/2023",
  //         "CheckOut": "3/08/2023"
  //     },
  //     {
  //         "IdReserva": 2,
  //         "Cliente": "Hospede 2",
  //         "IdImovel": 2,
  //         "NumeroImovel": "TESTE2",
  //         "NomeHotel": "Fiore Prime",
  //         "IdHotel": 1,
  //         "CheckIn": "5/08/2023",
  //         "CheckOut": "6/08/2023"
  //     }
  // ];


  const [reservations, setReservations] = useState([
    {
      "IdReserva": 2,
      "Cliente": "Hospede 1",
      "IdImovel": 1,
      "NumeroImovel": "TESTE1",
      "NomeHotel": "Fiore Prime",
      "IdHotel": 1,
      "CheckIn": "2023-08-01",
      "CheckOut": "2023-08-03"
  },
  {
      "IdReserva": 2,
      "Cliente": "Hospede 2",
      "IdImovel": 2,
      "NumeroImovel": "TESTE2",
      "NomeHotel": "Fiore Prime",
      "IdHotel": 1,
      "CheckIn": "2023-08-05",
      "CheckOut": "2023-08-06"
  }
  ]);  

const dataInicio: any = new Date('2023-07-26');
const dataFim: any = new Date('2023-08-30');

const mesesAbreviados = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const diasAbreviados = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const intervalo = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24));
const datasIntervalo : any = [];
  
for (let i = 1; i <= intervalo; i++) {
  const data = new Date(dataInicio);
  data.setDate(dataInicio.getDate() + i);
  datasIntervalo.push(data);
}

const dayWidth = 60;

const checkInDate = new Date('2023-07-30');
const checkOutDate = new Date('2023-08-03');

const checkInIndex = datasIntervalo.findIndex((date: any) => date.getTime() === checkInDate.getTime());
const checkOutIndex = datasIntervalo.findIndex((date: any) => date.getTime() === checkOutDate.getTime());

const [accordionOpen, setAccordionOpen] = useState(true);
const [dragging, setDragging] = useState(false);
const [dragStartX, setDragStartX] = useState(0);
const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);
const [guestData, setGuestData] = useState({
  checkIn: checkInIndex,
  checkOut: checkOutIndex,
});
  
const div1: any = useRef(null);
const div2: any = useRef(null);

const onScroll = () => {   
  debugger
  div2.current.scrollLeft = div1.current.scrollLeft;
}

const handleMouseDownDiv = (event: any) => {
  setDragging(true);
  setDragStartX(event.clientX);
  setDragStartScrollLeft(div1.current.scrollLeft);
};

const handleMouseMove = (event: any) => {
  if (dragging) {
    const offsetX = event.clientX - dragStartX;
    div1.current.scrollLeft = dragStartScrollLeft - offsetX;
  }
};

const handleMouseUp = () => {
  setDragging(false);
};

const handleMouseLeave = () => {
  setDragging(false);
};

const [mouseCheckIn, setMouseCheckIn] = useState<any>(checkInDate);
const [mouseCheckOut, setMouseCheckOut] = useState<any>(checkOutDate);

const handleMouseDown = (event: any, isCheckIn: any) => {

event.preventDefault();

console.log(guestData.checkIn, guestData.checkOut);

const startX = event.clientX;
const startLeft = (isCheckIn ? guestData.checkIn : guestData.checkOut) * dayWidth;

const handleMouseMove = (event: any) => {
  const offsetX = event.clientX - startX;
  const newLeft = startLeft + offsetX;

  const newDay = Math.max(1, Math.min(datasIntervalo.length, Math.floor(newLeft / dayWidth) + 1));

  let checkInDate: any;
  let checkOutDate: any;

  if (isCheckIn) {
    checkInDate = newDay;
    checkOutDate = Math.max(guestData.checkOut, newDay)

    setGuestData({
    checkIn: newDay,
    checkOut: Math.max(guestData.checkOut, newDay),
  });
  } else {
    checkInDate = Math.min(guestData.checkIn, newDay)
    checkOutDate = newDay
    setGuestData({
    checkIn: Math.min(guestData.checkIn, newDay),
    checkOut: newDay,
  });
  }

  setMouseCheckIn(datasIntervalo[checkInDate]);
  setMouseCheckOut(datasIntervalo[checkOutDate]);

  console.log(checkInDate, checkOutDate)
  console.log(datasIntervalo);
};

const handleMouseUp = () => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
};

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
};

const handleGuestMouseDown = (event: any) => {
  event.preventDefault();
  
  const startX = event.clientX;
  const startLeft = (guestData.checkIn - 1) * dayWidth;

  const handleMouseMove = (event: any) => {
  const offsetX = event.clientX - startX;
  const newLeft = startLeft + offsetX;

  const newCheckIn = Math.max(1, Math.min(datasIntervalo.length - (guestData.checkOut - guestData.checkIn), Math.floor(newLeft / dayWidth) + 1));
  const newCheckOut = newCheckIn + (guestData.checkOut - guestData.checkIn);

  setGuestData({
    checkIn: newCheckIn,
    checkOut: newCheckOut,
  }); 
};

const handleMouseUp = () => {
  window.removeEventListener('mousemove', handleMouseMove);
  window.removeEventListener('mouseup', handleMouseUp);
};

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', handleMouseUp);
};


const handleGuestDragStart = (event: any) => {
  event.dataTransfer.setData('text/plain', '');
};

const handleGuestDragEnd = () => {
  // Restaurar qualquer estado necessário após o arrastar do hóspede
};

const [droppedCheckIn, setDroppedCheckIn] = useState<any>(checkInDate);
const [droppedCheckOut, setDroppedCheckOut] = useState<any>(checkOutDate);

const handleDayDrop = (event: any, day: any) => {
  debugger
  event.preventDefault();

  const newCheckIn = day;
  const newCheckOut = newCheckIn + (guestData.checkOut - guestData.checkIn);
  
  datasIntervalo[newCheckIn]
  datasIntervalo[newCheckOut]

  setGuestData({
    checkIn: newCheckIn,
    checkOut: newCheckOut,
  });  

  convertCheckIn(datasIntervalo[newCheckIn])
  convertCheckOut(datasIntervalo[newCheckOut])

  setDroppedCheckIn(datasIntervalo[newCheckIn]);
  setDroppedCheckOut(datasIntervalo[newCheckOut]);
};

const toggleAccordion = () => {
   setAccordionOpen(!accordionOpen); 
};


const [CheckIn, setCheckIn] = useState<any>(checkInDate);
const [CheckOut, setCheckOut] = useState<any>(checkInDate);

const convertCheckIn = (dateIn : any) =>{
debugger
const CheckIn = new Date(dateIn);

let convertCheckIn = datasIntervalo.findIndex((date: any) => date.getTime() === CheckIn.getTime());

return convertCheckIn ;
}


const convertCheckOut = (dateOut : any) =>{
const CheckOut = new Date(dateOut);
debugger
let convertCheckOut = datasIntervalo.findIndex((date: any) => date.getTime() === CheckOut.getTime());
return convertCheckOut ;
}

return (
<main className={styles.main}>
    <div style={{display:'flex'}}>   
    <div >
      <div style={{display: 'flex', width:'80rem', overflow: 'auto', cursor: 'pointer'}} ref={div1}
        onScroll={onScroll}
        onMouseDown={handleMouseDownDiv}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}>
        <div style={{width:'10rem', backgroundColor:'#fff', borderRight: 'solid 3px'}}>TESTE0</div>
        <div className={styles.calendar}>
        <div className={styles.daysContainer} >
          {datasIntervalo.map((date: any, index: any) => (
            <div
              key={index}
              className={`${styles.day} ${styles.draggingOver}`} 
              style={{ backgroundColor: (diasAbreviados[date.getDay()] === 'Dom' || diasAbreviados[date.getDay()] === 'Sáb') ? 'white' : 'transparent'}}          
            >
              <span style={{ userSelect: 'none' }}>{mesesAbreviados[date.getMonth()]}</span>
              <span style={{ textAlign: 'center', userSelect: 'none'  }}>{date.getDate()}</span>
              <span style={{ userSelect: 'none' }}>{diasAbreviados[date.getDay()]}</span>
            </div>
          ))}     
        </div>
      </div>   
    </div>
    </div>
    </div>
    <div style={{width: '80rem' }}>
      <div  onClick={toggleAccordion} style={{height: '2.5rem' ,display: 'flex', justifyContent: 'flex-start', borderTop: 'solid 1px', borderBottom: 'solid 1px', background: '#fff',alignItems:'center'}}>
        Fiore Prime
        <ArrowDropDownIcon></ArrowDropDownIcon>
      </div>
      {accordionOpen && (
        <div>
        {reservations.map((reservation) => (
          <div
            key={reservation.IdImovel}
            style={{marginBottom: '20px'}}
          >
          <div style={{display:'flex',overflow: 'hidden'}} ref={div2} onScroll={onScroll}>
            <div style={{width:'10rem', backgroundColor:'#fff', borderRight: 'solid 3px'}}>{reservation.NumeroImovel}</div>
            <div className={styles.calendar} >
            <div className={styles.daysContainer} >
              {datasIntervalo.map((date: any, index: any) => (
                <div
                  key={index}
                  className={`${styles.day} ${styles.draggingOver}`}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDayDrop(event, index)}
                  style={{ backgroundColor: (diasAbreviados[date.getDay()] === 'Dom' || diasAbreviados[date.getDay()] === 'Sáb') ? 'white' : 'transparent'}}
                >
                  <span className={styles.clipPath}>{mesesAbreviados[date.getMonth()]}</span>
                  <span className={styles.clipPath} style={{ textAlign: 'center' }}>{date.getDate()}</span>
                  <span className={styles.clipPath}>{diasAbreviados[date.getDay()]}</span>
                </div>
              ))}
              
              <div
                className={`${styles.guest} ${styles.draggingGuest}`}
                style={{
                  left: `${convertCheckIn(reservation.CheckIn) * dayWidth}px`,
                  width: `${(convertCheckOut(reservation.CheckOut) - convertCheckIn(reservation.CheckIn) + 1) * dayWidth}px`,
                  cursor: 'move',
                  display: 'flex',
                  position: 'absolute',
                  justifyContent: 'space-between'
                }}
                draggable
                onDragStart={handleGuestDragStart}
                onDragEnd={handleGuestDragEnd}
              >
                <div
                  className={styles.checkInOut}
                  style={{
                    left: `0`,
                    cursor: 'col-resize',
                    background: 'black',
                    height: '100%',
                    width: '3px'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, true)}
                >                  
                </div>
                <span>{reservation.Cliente}</span>
                <div
                  className={styles.checkInOut}
                  style={{
                    left: `0`,                   
                    cursor: 'col-resize',
                    background: 'black',
                    height: '100%',
                    width: '3px'
                  }}
                  onMouseDown={(e) => handleMouseDown(e, false)}
                >                  
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        ))}
      </div>
      )}      
  </div> 



    <div>
      <h3>DROP</h3>
      <span>CHECK-IN : {droppedCheckIn ? droppedCheckIn.toDateString() : 'N/A'}</span><br/>
      <span>CHECK-OUT : {droppedCheckOut ? droppedCheckOut.toDateString() : 'N/A'}</span>
    </div>
    <div>
      <h3>MouseMove</h3>
      <span>CHECK-IN : {mouseCheckIn ? mouseCheckIn.toDateString() : 'N/A'}</span><br/>
      <span>CHECK-OUT : {mouseCheckOut ? mouseCheckOut.toDateString() : 'N/A'}</span>
    </div>              

  </main>
  )
}

