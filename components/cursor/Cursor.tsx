"use client";

import { useEffect, useRef } from "react";
import styles from "./cursor.module.css";


export default function Cursor() {


  const cursorRef = useRef<HTMLDivElement>(null);


  const mouse = useRef({
    x:0,
    y:0,
  });


  const position = useRef({

    x:
      typeof window !== "undefined"
        ? window.innerWidth / 2
        : 0,

    y:
      typeof window !== "undefined"
        ? window.innerHeight / 2
        : 0,

  });



  const targetSize = useRef(18);

  const currentSize = useRef(18);

  const initialized = useRef(false);



  useEffect(()=>{


    const handleMouseMove = (e:MouseEvent)=>{


      mouse.current.x = e.clientX;

      mouse.current.y = e.clientY;



      if(!initialized.current){

        position.current.x = e.clientX;

        position.current.y = e.clientY;

        initialized.current = true;

      }



      const target = e.target as HTMLElement;


      const clickable = target.closest(

        "[data-card], button, a, [role='button'], input, textarea"

      );



      targetSize.current = clickable
        ? 34
        : 18;


    };



    window.addEventListener(
      "mousemove",
      handleMouseMove
    );



    let frame:number;



    const animate = ()=>{


      position.current.x +=

        (
          mouse.current.x -
          position.current.x

        ) * 0.14;



      position.current.y +=

        (
          mouse.current.y -
          position.current.y

        ) * 0.14;



      currentSize.current +=

        (
          targetSize.current -
          currentSize.current

        ) * 0.18;



      if(cursorRef.current){


        const size = currentSize.current;



        cursorRef.current.style.width =
          `${size}px`;


        cursorRef.current.style.height =
          `${size}px`;



        cursorRef.current.style.transform =

          `
          translate3d(
            ${position.current.x - size / 2}px,
            ${position.current.y - size / 2}px,
            0
          )
          `;


      }



      frame = requestAnimationFrame(
        animate
      );


    };



    animate();



    return()=>{

      cancelAnimationFrame(frame);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

    };


  },[]);



  return (

    <div

      ref={cursorRef}

      className={styles.cursor}

    />

  );

}