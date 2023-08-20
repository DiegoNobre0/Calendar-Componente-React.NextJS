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
import React, { useRef, useState, useEffect } from "react";
import { useDrop } from "react-dnd";


import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expanded2, setExpanded2] = useState<string | false>(false);

//   const reservations = 
//   [
//     {
//         "IdReserva": 2,
//         "Cliente": "Diego",
//         "IdImovel": 1,
//         "IdHotel": 1,
//         "CheckIn": "1/08/2023",
//         "CheckOut": "3/08/2023"
//     },
//     {
//         "IdReserva": 2,
//         "Cliente": "Kamyla",
//         "IdImovel": 2,
//         "IdHotel": 1,
//         "CheckIn": "5/08/2023",
//         "CheckOut": "6/08/2023"
//     }
// ];


    const handleChange1 =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

    const handleChange2 =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded2(isExpanded ? panel : false);
    };

    //Método para usar o scroll em duas divs
    const div1: any = useRef(null);
    const div2: any = useRef(null);
  
    const onScroll = () => {   
      div2.current.scrollLeft = div1.current.scrollLeft;
    }
    
   

    const [clients, setClients] = useState<string[]>(['Diego']);
    const initialCalendarState = Array.from({ length: 7 }, (_, index) => ({
      date: index,
      client: index < clients.length ? clients[index] : '',
      entry: index < clients.length ? index + 1 : 0,
      departure: index < clients.length ? index + 2 : 0,
    }));
    const [calendar, setCalendar] = useState(initialCalendarState);
  
    const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };
  
    const drop = (targetIndex: number) => {
      if (draggedClient !== '' && selectedEntry !== null) {
        const updatedCalendar = [...calendar];
  
        const previousIndex = updatedCalendar.findIndex(entry => entry.client === draggedClient);
        if (previousIndex !== -1) {
          updatedCalendar[previousIndex].client = '';
        }
  
        updatedCalendar[targetIndex].client = draggedClient;
        updatedCalendar[targetIndex].entry = selectedEntry;
  
        if (targetIndex + 1 < calendar.length) {
          updatedCalendar[targetIndex].departure = updatedCalendar[targetIndex + 1].entry;
        } else {
          updatedCalendar[targetIndex].departure = selectedEntry + 1;
        }
  
        console.log(`Moved to position: ${targetIndex}`);
        console.log(`Entry Date: ${selectedEntry}`);
        console.log(`Departure Date: ${updatedCalendar[targetIndex].departure}`);
  
        setCalendar(updatedCalendar);
        setDraggedClient('');
        setSelectedEntry(null);
      }
    };
  
    const [draggedClient, setDraggedClient] = useState<string>('');
    const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  
    const startDrag = (e: React.DragEvent<HTMLDivElement>, client: string, entryDate: number) => {
      setDraggedClient(client);
      e.dataTransfer.setData('text/plain', client);
      setSelectedEntry(entryDate);
    };
  
    const handleDragEnd = () => {
      setDraggedClient('');
      setSelectedEntry(null);
    };
  return (
    <main className={styles.main}>




<div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
      {calendar.map((entry, index) => (
        <div
          key={index}
          style={{
            display: 'grid',
            padding: '0.1rem 0.5rem 0.1rem 0.5rem',
            border: 'solid 1px',
            fontSize: '10px',
            position: 'relative',
          }}
          onDrop={() => drop(index)}
          onDragOver={allowDrop}
        >
          <span>Set</span>
          <span style={{ textAlign: 'center' }}>{entry.date + 1}</span>
          {entry.client && (
            <>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `calc(${entry.entry * 100}%)`,
                  transform: 'translate(-50%, -50%)',
                  width: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '5px',
                  background: 'lightblue',
                  borderRadius: '5px',
                  zIndex: 1,
                  cursor: 'move',
                }}
                draggable
                onDragStart={(e) => startDrag(e, entry.client, entry.entry)}
                onDragEnd={handleDragEnd}
              >
                {entry.client}
              </div>
              
            </>
          )}
        </div>
      ))}
    </div>



      <div style={{width:'80rem', paddingBottom:'2rem',paddingTop:'10rem'}}>
        <div>
          <Accordion expanded={expanded === 'panel1'} onChange={handleChange1('panel1')} >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>
                Filtros
              </Typography>
              {/* <Typography sx={{ color: 'text.secondary' }}>I am an accordion</Typography> */}
            </AccordionSummary>
            <AccordionDetails>
              
              <div style={{display: 'flex', justifyContent:'space-evenly', alignItems: 'center'}}>
                <Box>
                  <Typography> Cliente</Typography>
                  <TextField
                    id="outlined-start-adornment"
                    InputProps={{
                      startAdornment: 
                      <InputAdornment position="start">
                        {/* <Icon>star</Icon>; */}
                      </InputAdornment>,
                    }}
                  />
                </Box>
                <Box>
                  <Typography> Condomínio</Typography>
                  <TextField
                    id="outlined-start-adornment"
                    InputProps={{
                      startAdornment: 
                      <InputAdornment position="start">
                        {/* <Icon>star</Icon>; */}
                      </InputAdornment>,
                    }}
                  />
                </Box>
                <Box>
                <Typography> Período</Typography>
              
                </Box>
                <Box>
                <Button variant="contained">Filtrar</Button>
                </Box>
              </div> 
            </AccordionDetails>
          </Accordion>
        </div>
    </div>
    <div style={{backgroundColor:'red'}}>
    </div>
    <div >
      <div style={{display: 'flex', width:'80rem'}}>
        <div style={{width:'10rem', backgroundColor:'#fff', borderRight: 'solid 3px'}}></div>
        
        <div ref={div1}  onScroll={onScroll} style={{display: 'flex', overflow: 'auto'}}>   
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>1</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>2</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>3</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>4</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>5</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>6</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>7</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>8</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>9</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>10</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>11</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>12</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>13</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>14</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>15</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>16</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>17</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>18</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>19</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}} ><span>Set</span><span style={{textAlign: 'center'}}>20</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>21</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>22</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>23</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>24</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>25</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>26</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>27</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>28</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>29</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>30</span><span>Seg</span></div>  
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>15</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>16</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>17</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>18</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>19</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}} ><span>Set</span><span style={{textAlign: 'center'}}>20</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>21</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>22</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>23</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>24</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>25</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>26</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>27</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>28</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>29</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>30</span><span>Seg</span></div>         
        </div>
      </div>
    </div>
    <div >
      <div style={{height: '2.5rem' ,display: 'flex', flexDirection: 'column', justifyContent: 'center', borderTop: 'solid 1px', borderBottom: 'solid 1px', background: '#fff'}}>
        Fiore Prime
      </div>
      <div style={{display: 'flex', width:'80rem'}}>
        <div style={{width:'10rem', backgroundColor:'#fff', borderRight: 'solid 3px'}}></div>        
        <div ref={div2} onScroll={onScroll} style={{display: 'flex', overflow:'hidden'}}>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>1</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>2</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>3</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>4</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>5</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>6</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>7</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>8</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>9</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>10</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>11</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>12</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>13</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>14</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>15</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>16</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>17</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>18</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>19</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}} ><span>Set</span><span style={{textAlign: 'center'}}>20</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>21</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>22</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>23</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>24</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>25</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>26</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>27</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>28</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>29</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>30</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>15</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>16</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>17</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>18</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>19</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}} ><span>Set</span><span style={{textAlign: 'center'}}>20</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>21</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>22</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>23</span><span>Seg</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>24</span><span>Ter</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>25</span><span>Qua</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>26</span><span>Qui</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>27</span><span>Sex</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>28</span><span>Sáb</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>29</span><span>Dom</span></div>
            <div style={{display:'grid', padding: "0.1rem 0.5rem 0.1rem 0.5rem", border: 'solid 1px', fontSize: '10px'}}><span>Set</span><span style={{textAlign: 'center'}}>30</span><span>Seg</span></div>           
        </div>
      </div>
    </div>
  </main>
  )
}

