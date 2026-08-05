"use client";

import { useEffect, useState } from "react";

import styles from "./card.module.css";


export default function CameraHUD() {

  const [timer,setTimer] = useState(0);


  const battery = 78;


  useEffect(() => {

    const start = Date.now();


    const interval = setInterval(() => {

      setTimer(
        Math.floor(
          (Date.now() - start) / 1000
        )
      );

    },1000);


    return () => clearInterval(interval);


  },[]);



  const hours = String(
    Math.floor(timer / 3600)
  ).padStart(2,"0");


  const minutes = String(
    Math.floor(
      (timer % 3600) / 60
    )
  ).padStart(2,"0");


  const seconds = String(
    timer % 60
  ).padStart(2,"0");



  return (

    <>


      <div className={styles.cameraTop}>

        <span>
          CAM 01
        </span>


        <span className={styles.rec}>

          ● REC

        </span>


      </div>



      <div className={styles.cameraBottom}>


        <span>

          ISO 400&nbsp;&nbsp;
          720P&nbsp;&nbsp;
          F2.8&nbsp;&nbsp;
          1/60

        </span>



        <span>

          REC {hours}:{minutes}:{seconds}

        </span>


      </div>



      <div className={styles.battery}>

        BAT&nbsp;

        <span className={styles.greenBars}>
          ▮▮▮▯
        </span>

        &nbsp;{battery}%

      </div>


    </>

  );

}