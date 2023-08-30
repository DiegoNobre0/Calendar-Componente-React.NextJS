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

const [accordionOpen, setAccordionOpen] = useState(true);
const dataInicio: any = new Date('2023-02-01');
const dataFim: any = new Date('2023-02-25');

const mesesAbreviados = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
const diasAbreviados = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const intervalo = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24));
const datasIntervalo = [];
  
for (let i = 1; i <= intervalo; i++) {
  const data = new Date(dataInicio);
  data.setDate(dataInicio.getDate() + i);
  datasIntervalo.push(data);
}

const dayWidth = 60;

const checkInDate = new Date('2023-02-04');
const checkOutDate = new Date('2023-02-09');

const checkInIndex = datasIntervalo.findIndex(date => date.getTime() === checkInDate.getTime());
const checkOutIndex = datasIntervalo.findIndex(date => date.getTime() === checkOutDate.getTime());

const [guestData, setGuestData] = useState({
  checkIn: checkInIndex,
  checkOut: checkOutIndex,
});
  
const div1: any = useRef(null);
const div2: any = useRef(null);

const onScroll = () => {   
  div2.current.scrollLeft = div1.current.scrollLeft;
}


const handleMouseDown = (event: any, isCheckIn: any) => {
event.preventDefault();

const startX = event.clientX;
const startLeft = (isCheckIn ? guestData.checkIn : guestData.checkOut) * dayWidth;

const handleMouseMove = (event: any) => {
  const offsetX = event.clientX - startX;
  const newLeft = startLeft + offsetX;

  const newDay = Math.max(1, Math.min(datasIntervalo.length, Math.floor(newLeft / dayWidth) + 1));

  if (isCheckIn) {
    setGuestData({
    checkIn: newDay,
    checkOut: Math.max(guestData.checkOut, newDay),
  });
  } else {
    setGuestData({
    checkIn: Math.min(guestData.checkIn, newDay),
    checkOut: newDay,
  });
  }
    console.log(guestData.checkIn, guestData.checkOut)
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
  console.log(guestData.checkIn, guestData.checkOut)

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

  console.log(guestData.checkIn, guestData.checkOut)
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

const handleDayDrop = (event: any, day: any) => {
  event.preventDefault();

  const newCheckIn = day;
  const newCheckOut = newCheckIn + (guestData.checkOut - guestData.checkIn);

  setGuestData({
    checkIn: newCheckIn,
    checkOut: newCheckOut,
  });

  console.log(newCheckIn, newCheckOut)
};

const toggleAccordion = () => {
   setAccordionOpen(!accordionOpen); 
};

return (
<main className={styles.main}>
    <div style={{display:'flex'}}>   
    <div >
      <div style={{display: 'flex', width:'80rem', overflow: 'auto'}}>
        <div style={{width:'10rem', backgroundColor:'#fff', borderRight: 'solid 3px'}}>TESTE</div>
        <div className={styles.calendar}>
        <div className={styles.daysContainer} ref={div1} onScroll={onScroll}>
          {datasIntervalo.map((date, index) => (
            <div
              key={index}
              className={`${styles.day} ${styles.draggingOver}`}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => handleDayDrop(event, index)}
            >
              <span>{mesesAbreviados[date.getMonth()]}</span>
              <span style={{ textAlign: 'center' }}>{date.getDate()}</span>
              <span>{diasAbreviados[date.getDay()]}</span>
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
        <div style={{display:'flex',overflow: 'auto'}}>
            <div style={{width:'10rem', backgroundColor:'#fff', borderRight: 'solid 3px'}}>TESTE</div>
            <div className={styles.calendar} >
            <div className={styles.daysContainer} ref={div2} onScroll={onScroll}>
              {datasIntervalo.map((date, index) => (
                <div
                  key={index}
                  className={`${styles.day} ${styles.draggingOver}`}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDayDrop(event, index)}
                >
                  <span>{mesesAbreviados[date.getMonth()]}</span>
                  <span style={{ textAlign: 'center' }}>{date.getDate()}</span>
                  <span>{diasAbreviados[date.getDay()]}</span>
                </div>
              ))}
              <div
                className={`${styles.guest} ${styles.draggingGuest}`}
                style={{
                  left: `${guestData.checkIn * dayWidth}px`,
                  width: `${(guestData.checkOut - guestData.checkIn + 1) * dayWidth}px`,
                  cursor: 'move',
                  display: 'flex',
                  position: 'absolute',
                }}
                draggable
                onDragStart={handleGuestDragStart}
                onDragEnd={handleGuestDragEnd}
              >
                <div
                  className={styles.checkInOut}
                  style={{
                    left: `0`,
                    width: `100%`,
                    cursor: 'col-resize',
                  }}
                  onMouseDown={(e) => handleMouseDown(e, true)}
                >
                  in
                </div>
                <div
                  className={styles.checkInOut}
                  style={{
                    left: `0`,
                    width: `14%`,
                    cursor: 'col-resize',
                  }}
                  onMouseDown={(e) => handleMouseDown(e, false)}
                >
                  out
                </div>
              </div>
            </div>
          </div>
        </div>
      )}      
    </div> 
  </main>
  )
}

