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
import React, { useRef, useState } from "react";
import { useDrop } from "react-dnd";


import 'react-datepicker/dist/react-datepicker.css';

export default function Home() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [expanded2, setExpanded2] = useState<string | false>(false);

  const reservations = 
  [
    {
        "IdReserva": 2,
        "Cliente": "Nome do Cliente 1",
        "IdImovel": 1,
        "IdHotel": 1,
        "CheckIn": "11/08/2023",
        "CheckOut": "13/08/2023"
    },
    {
        "IdReserva": 2,
        "Cliente": "Nome do Cliente 2",
        "IdImovel": 2,
        "IdHotel": 1,
        "CheckIn": "12/08/2023",
        "CheckOut": "16/08/2023"
    }
];


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

   
  
    




  return (
    <main className={styles.main}>










      <div style={{width:'80rem', paddingBottom:'2rem'}}>
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

