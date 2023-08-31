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
import React, { useEffect, useRef, useState } from "react";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { log } from 'console';

export default function Home() {

  const [reservations, setReservations] = useState([
    {
      IdReserva: 2,
      Cliente: "Hospede 1",
      IdImovel: 1,
      NumeroImovel: "TESTE1",
      NomeHotel: "Fiore Prime",
      IdHotel: 1,
      CheckIn: "2023-08-01",
      CheckOut: "2023-08-03"
    },
    //  {
    //   IdReserva: 2,
    //   Cliente: "Hospede 2",
    //   IdImovel: 2,
    //   NumeroImovel: "TESTE2",
    //   NomeHotel: "Fiore Prime",
    //   IdHotel: 1,
    //   CheckIn: "2023-08-05",
    //   CheckOut: "2023-08-06"
    // }
  ]);

  const dataInicio: any = new Date('2023-07-26');
  const dataFim: any = new Date('2023-08-30');

  const mesesAbreviados = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const diasAbreviados = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const intervalo = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24));

  const datasIntervalo: any = [];

  for (let i = 1; i <= intervalo; i++) {
    const data = new Date(dataInicio);
    data.setDate(dataInicio.getDate() + i);
    datasIntervalo.push(data);
  }

  const dayWidth = 60;

  const [accordionOpen, setAccordionOpen] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollLeft, setDragStartScrollLeft] = useState(0);


  const div2 = useRef<HTMLDivElement[]>([]);
  const div1: any = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    div2.current.forEach(current => {
      current.scrollLeft = div1.current?.scrollLeft || 0
    })
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

  const [mouseCheckIn, setMouseCheckIn] = useState<any>(reservations[0].CheckIn);
  const [mouseCheckOut, setMouseCheckOut] = useState<any>(reservations[0].CheckOut);

  const handleMouseDown = (event: any, isCheckIn: any, reservationIndex: number) => {   
    event.preventDefault();    
    const reservation = reservations[reservationIndex];  
      
    const checkInDate = new Date(reservation.CheckIn);
    const checkOutDate = new Date(reservation.CheckOut);
        
    const checkInIndex = (datasIntervalo.findIndex((date: any) => date.getTime() === checkInDate.getTime()) + 1);
    const checkOutIndex = (datasIntervalo.findIndex((date: any) => date.getTime() === checkOutDate.getTime()) + 1);  
    
    const startX = event.clientX;
    const startLeft = (isCheckIn ? checkInIndex : checkOutIndex) * dayWidth;
    
    const handleMouseMove = (event: any) => {
      
      const offsetX = event.clientX - startX;
      const newLeft =  offsetX + startLeft ;

      const newDay = Math.max(1, Math.min(datasIntervalo.length, Math.floor(newLeft / dayWidth) + 1));
      
      let checkInDate: number;
      let checkOutDate: number;
  
      if (isCheckIn) {
        checkInDate = newDay;
        checkOutDate = Math.max(checkOutIndex,newDay )   
        
      } else {
        checkInDate = Math.min(checkInIndex,newDay)
        checkOutDate = newDay      
      }

      console.log(checkInDate,checkOutDate)
      setReservations(reservation => reservation.map((_reservaton, index) => {
        if (index === reservationIndex) {
          return {
            ..._reservaton,
            CheckIn: datasIntervalo[checkInDate],
            CheckOut: datasIntervalo[checkOutDate]
          }
        }
        return _reservaton
      }))

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


  const handleDayDrop = (event: any, day: any, reservationIndex: number) => {
    debugger
    event.preventDefault();

    const reservation = reservations[reservationIndex];
    debugger
    const checkInDate = new Date(reservation.CheckIn);
    const checkOutDate = new Date(reservation.CheckOut);
        
    const checkInIndex = (datasIntervalo.findIndex((date: any) => date.getTime() === checkInDate.getTime()) + 1);
    const checkOutIndex = (datasIntervalo.findIndex((date: any) => date.getTime() === checkOutDate.getTime()) + 1);

    debugger
    const newCheckIn = day;
    const newCheckOut = newCheckIn + (checkInIndex - checkOutIndex - 2);

    datasIntervalo[newCheckIn]
    datasIntervalo[newCheckOut]
   
  
    // Ao fazer o drop esta aumentando o tamanho da width
    setReservations(reservation => reservation.map((_reservaton, index) => {
      if (index === reservationIndex) {
        return {
          ..._reservaton,
          CheckIn: datasIntervalo[newCheckIn],
          CheckOut: datasIntervalo[newCheckOut]
        }
      }
      
      return _reservaton
    }))
  };

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  useEffect(() => {
  },[])
  
  const convertCheckIn = (dateIn: any) => {  
    let CheckIn = new Date(dateIn);
    let convertCheckIn = datasIntervalo.findIndex((date: any) => date.getTime() === CheckIn.getTime());
    let teste = (convertCheckIn);
    console.log(teste)
    return (convertCheckIn);
  }


  const convertCheckOut = (dateOut: any) => {
    let CheckOut = new Date(dateOut);
    let convertCheckOut = datasIntervalo.findIndex((date: any) => date.getTime() === CheckOut.getTime()); 
    let teste = ( convertCheckOut);
    console.log(teste)
    console.log(datasIntervalo)
    return (convertCheckOut);
  }

  return (
    <main className={styles.main}>
      <div style={{ display: 'flex' }}>
        <div >
          <div style={{ display: 'flex', width: '80rem', overflow: 'auto', cursor: 'pointer' }} ref={div1}
            onScroll={onScroll}
            onMouseDown={handleMouseDownDiv}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}>
            <div style={{ width: '10rem', backgroundColor: '#fff', borderRight: 'solid 3px' }}>TESTE0</div>
            <div className={styles.calendar}>
              <div className={styles.daysContainer} >
                {datasIntervalo.map((date: any, index: any) => (
                  <div
                    key={index}
                    className={`${styles.day} ${styles.draggingOver}`}
                    style={{ backgroundColor: (diasAbreviados[date.getDay()] === 'Dom' || diasAbreviados[date.getDay()] === 'Sáb') ? 'white' : 'transparent' }}
                  >
                    <span style={{ userSelect: 'none' }}>{mesesAbreviados[date.getMonth()]}</span>
                    <span style={{ textAlign: 'center', userSelect: 'none' }}>{date.getDate()}</span>
                    <span style={{ userSelect: 'none' }}>{diasAbreviados[date.getDay()]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: '80rem' }}>
        <div onClick={toggleAccordion} style={{ height: '2.5rem', display: 'flex', justifyContent: 'flex-start', borderTop: 'solid 1px', borderBottom: 'solid 1px', background: '#fff', alignItems: 'center' }}>
          Fiore Prime
          <ArrowDropDownIcon></ArrowDropDownIcon>
        </div>
        {accordionOpen && (
          <div>
            {reservations.map((reservation: any, reservationIndex: any) => (
              <div
                key={reservationIndex}
                style={{ marginBottom: '20px' }}
              >
                <div style={{ display: 'flex', overflow: 'hidden' }} ref={(element) => {
                  div2.current[reservationIndex] = element as any
                }} onScroll={onScroll}>
                  <div style={{ width: '10rem', backgroundColor: '#fff', borderRight: 'solid 3px' }}>{reservation.NumeroImovel}</div>
                  <div className={styles.calendar} >
                    <div className={styles.daysContainer} >
                      {datasIntervalo.map((date: any, index: any) => (
                        <div
                          key={index}
                          className={`${styles.day} ${styles.draggingOver}`}
                          onDragOver={(event) => event.preventDefault()}
                          onDrop={(event) => handleDayDrop(event, index, reservationIndex)}
                          style={{ backgroundColor: (diasAbreviados[date.getDay()] === 'Dom' || diasAbreviados[date.getDay()] === 'Sáb') ? 'white' : 'transparent' }}
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
                          width: `${((convertCheckOut(reservation.CheckOut) + 1) - convertCheckIn(reservation.CheckIn)) * dayWidth}px`,
                          cursor: 'move',
                          display: 'flex',
                          position: 'absolute',
                          justifyContent: 'space-between'
                        }}
                        draggable
                      // onDragStart={handleGuestDragStart}
                      // onDragEnd={handleGuestDragEnd}
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
                          onMouseDown={(e) => handleMouseDown(e, true, reservationIndex)}
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
                          onMouseDown={(e) => handleMouseDown(e, false, reservationIndex)}
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
    </main>
  )
}

