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

  const [draggedHospede, setDraggedHospede] = useState("");

  const [reservations, setReservations] = useState([
    {
      IdReserva: 1,
      Cliente: "Hospede 1",
      IdImovel: 1,     
      NomeHotel: "Fiore Prime",
      IdHotel: 1,
      CheckIn: "2023-08-01",
      CheckOut: "2023-08-03"
    },

    {
      IdReserva: 2,
      Cliente: "Hospede 2",
      IdImovel: 1,      
      NomeHotel: "Fiore Prime",
      IdHotel: 1,
      CheckIn: "2023-07-28",
      CheckOut: "2023-07-30"
    },

    {
      IdReserva: 3,
      Cliente: "Hospede 3",
      IdImovel: 2,      
      NomeHotel: "Fiore Prime",
      IdHotel: 1,
      CheckIn: "2023-08-05",
      CheckOut: "2023-08-06"
    },

    {
      IdReserva: 4,
      Cliente: "Hospede 4",
      IdImovel: 3,    
      NomeHotel: "Fiore Prime",
      IdHotel: 1,
      CheckIn: "2023-07-29",
      CheckOut: "2023-08-01"
    }
  ]);


  const [bedrooms, setBedrooms] = useState([
    {     
      IdImovel: 1,
      NomeQuarto: "QUARTO 1"    
    },
    {    
      IdImovel: 2,
      NomeQuarto: "QUARTO 2"      
    },
    {    
      IdImovel: 3,
      NomeQuarto: "QUARTO 3"      
    }
  ]);
  

  const reservationsByBedrooms: any = {};
  // Inicializa as listas de reservas para cada quarto
  bedrooms.forEach(bedrooms => {
    reservationsByBedrooms[bedrooms.IdImovel] = [];
  });  
  // Preenche as listas de reservas para cada quarto
  reservations.forEach(reservation => {
    const { IdImovel } = reservation;    
    reservationsByBedrooms[IdImovel].push(reservation);
  });
  
  const groupedReservationsList = Object.values(reservationsByBedrooms);    

  const dataInicio: any = new Date('2023-07-26');
  const dataFim: any = new Date('2023-08-30');

  const mesesAbreviados = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const diasAbreviados = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const intervalo = Math.floor((dataFim - dataInicio) / (1000 * 60 * 60 * 24));

  const datasIntervalo: any = [];

  for (let i = 0; i <= intervalo; i++) {
    if (i == 0) {
      const data = new Date(dataInicio);
      data.setDate(dataInicio.getDate() + i + 1);
      datasIntervalo.push(data);
    }
    const data = new Date(dataInicio);
    data.setDate(dataInicio.getDate() + i + 1);
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

  const handleMouseDown = (event: any, isCheckIn: any, reservationIndex: any) => {    
    event.preventDefault();

    const reservation: any = reservations.find((reservation) => reservation.IdReserva === reservationIndex.IdReserva);

    const checkInDate = new Date(reservation.CheckIn);
    const checkOutDate = new Date(reservation.CheckOut);

    const checkInIndex = (datasIntervalo.findIndex((date: any) => date.getTime() === checkInDate.getTime()));
    const checkOutIndex = (datasIntervalo.findIndex((date: any) => date.getTime() === checkOutDate.getTime()));

    const startX = event.clientX;
    const startLeft = (isCheckIn ? checkInIndex : checkOutIndex) * dayWidth;

    const handleMouseMove = (event: any) => {

      const offsetX = event.clientX - startX;
      const newLeft = offsetX + startLeft;

      const newDay = Math.max(1, Math.min(datasIntervalo.length, Math.floor(newLeft / dayWidth)));

      let checkInDate: number;
      let checkOutDate: number;

      if (isCheckIn) {
        checkInDate = newDay;
        checkOutDate = Math.max(checkOutIndex, newDay)

      } else {
        checkInDate = Math.min(checkInIndex, newDay)
        checkOutDate = newDay
      }

      setReservations(reservation => {
        reservation.forEach((_reservation) => {
          if (_reservation.IdReserva === reservationIndex.IdReserva && checkInDate !== checkOutDate) {
            _reservation.CheckIn = datasIntervalo[checkInDate];
            _reservation.CheckOut = datasIntervalo[checkOutDate];
          }
        });

        return [...reservation];
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // const handleGuestDragStart = (event: any) => {
  //   event.dataTransfer.setData('text/plain', '');
  // };

  // const handleGuestDragEnd = () => {
  //   // Restaurar qualquer estado necessário após o arrastar do hóspede
  // };


  const handleDayDrop = (event: any, day: any, reservationIndex: any) => {
    // debugger
    event.preventDefault();
 
    const jsonObject = JSON.parse(draggedHospede);   

    const id = jsonObject.IdReserva;

    const reservation: any = reservations.find((reservation) => reservation.IdReserva === id);

    const idImovel = jsonObject.IdImovel;

    const clientY = Math.ceil((event.clientY / 60) - 2);

    setReservations(reservation => reservation.map((_reservaton) => {
      if (_reservaton.IdReserva === id && idImovel !== clientY) {
        return {
          ..._reservaton,
          IdImovel: clientY            
        }
      }
        return _reservaton
    }))    

    const checkInDate = new Date(reservation.CheckIn);
    const checkOutDate = new Date(reservation.CheckOut);

    const checkInIndex = (datasIntervalo.findIndex((date: any) => date.getTime() === checkInDate.getTime()) + 1);
    const checkOutIndex = (datasIntervalo.findIndex((date: any) => date.getTime() === checkOutDate.getTime()) + 1);
    
    const newCheckIn = day;    
    const newCheckOut = newCheckIn + (checkOutIndex - checkInIndex);

    setReservations(reservation => reservation.map((_reservaton) => {
      if (_reservaton.IdReserva === id && newCheckIn !== newCheckOut) {
        return {
          ..._reservaton,
          CheckIn: datasIntervalo[newCheckIn],
          CheckOut: datasIntervalo[newCheckOut]
        }
      }
      return _reservaton
    }))
  };

  // const checkDateIn = (checkIn: any) =>{
  //   debugger  

  //   reservations.forEach(reservation => {
  //     debugger
  //     const checkInDate = new Date(reservation.CheckIn);
  //     const checkInIndex = (datasIntervalo.findIndex((date: any) => date.getTime() === checkInDate.getTime()) + 1)
      
  //     if(checkIn === checkInIndex){
  //       return 1;
  //     }
  //   });  
  //   return 1; 
  // }

  // const checkDateout = (checkOut: any) =>{
  //   let teste = 1;
  //   return teste
  // }

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  const convertCheckIn = (dateIn: any) => {
    let CheckIn = new Date(dateIn);
    let convertCheckIn = datasIntervalo.findIndex((date: any) => date.getTime() === CheckIn.getTime());
    return convertCheckIn;
  }

  const convertCheckOut = (dateOut: any) => {
    let CheckOut = new Date(dateOut);
    let convertCheckOut = datasIntervalo.findIndex((date: any) => date.getTime() === CheckOut.getTime());
    return convertCheckOut;
  }

  const handleDrag = (e: any, index: any, hospede:any) =>{   
    const hospedeStringfy = JSON.stringify(hospede);
    setDraggedHospede(hospedeStringfy);  
    console.log(e)
  }

  const addReservation = (event : any, date: any) => {

  const clientY = Math.ceil((event.clientY / 60) - 2);

  const newReservation = {
    IdReserva: 5,
    Cliente: "Hospede 5",
    IdImovel: clientY,
    NomeHotel: "Fiore Prime", 
    IdHotel: 1,
    CheckIn: datasIntervalo[date],
    CheckOut: datasIntervalo[date + 1]
  };

  const newReservations = [...reservations];

  newReservations.push(newReservation);
 
  setReservations(newReservations);
}


const allowDrop = (event : any) => {
  event.preventDefault();
  event.target.style.border = "4px dotted green";
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
            <div style={{ width: '10rem', backgroundColor: '#fff', borderRight: 'solid 3px' }}>TESTE</div>
            <div className={styles.calendar}>
              <div className={styles.daysContainer} >
                {datasIntervalo.map((date: any, index: any) => (
                  <div
                    key={index}
                    className={`${styles.day} ${styles.draggingOver}`}
                    style={{ backgroundColor: (diasAbreviados[date.getDay()] === 'Dom' || diasAbreviados[date.getDay()] === 'Sáb') ? 'gray' : 'white' }}
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
            {groupedReservationsList.map((hospedes: any, index: any,) => {                    
              // debugger 
              return (
                <div key={index}>                 
                  <div>
                    <div >
                      <div style={{ display: 'flex', overflow: 'hidden' }} ref={(element) => {
                        div2.current[index] = element as any
                      }} onScroll={onScroll}>
                        <div style={{ width: '10rem', backgroundColor: '#fff', borderRight: 'solid 3px' }}>TESTE</div>
                        <div className={styles.calendar}>
                          <div className={styles.daysContainer}>
                            {datasIntervalo.map((date: any, index: any) => {                      
                              return (
                                <div
                                  key={index}
                                  className={`${styles.day} ${styles.draggingOver}`}
                                  // onDragOver={(event) => event.preventDefault()}
                                  onDrop={(event) => handleDayDrop(event, index, draggedHospede)}
                                  onClick={(event) => addReservation(event, index)}  
                                  onDragOver={(event) => allowDrop(event)}                                 
                                  style={{ backgroundColor: (diasAbreviados[date.getDay()] === 'Dom' || diasAbreviados[date.getDay()] === 'Sáb') ? 'gray' : 'white' }}
                                >
                                  <span className={styles.clipPath}>{mesesAbreviados[date.getMonth()]}</span>
                                  <span className={styles.clipPath} style={{ textAlign: 'center' }}>{date.getDate()}</span>
                                  <span className={styles.clipPath}>{diasAbreviados[date.getDay()]}</span>
                                </div>
                              )
                            })}

                            {hospedes.map((reservation: any, indexador: any) => (
                              <div
                                key={indexador}
                                className={`${styles.guest} ${styles.draggingGuest}`}
                                style={{
                                  left: `${convertCheckIn(reservation.CheckIn) * dayWidth}px`,
                                  width: `${((convertCheckOut(reservation.CheckOut) + 1) - convertCheckIn(reservation.CheckIn)) * dayWidth}px`,
                                  height: `${dayWidth/2}px`,
                                  cursor: 'move',
                                  display: 'flex',
                                  position: 'absolute',
                                  justifyContent: 'space-between'
                                }}
                                draggable
                                onDrag={(event) => handleDrag(event, indexador, reservation)}
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
                                  onMouseDown={(e) => handleMouseDown(e, true, reservation)}
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
                                  onMouseDown={(e) => handleMouseDown(e, false, reservation)}
                                >
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}

