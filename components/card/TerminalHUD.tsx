"use client";

import { useEffect, useRef, useState } from "react";

import styles from "./card.module.css";


const lines = [

  "PS C:\\Users\\namanUwU> npm run dev",

  "> portfolio@1.0 dev",

  "> next dev",

  "✓ server started",

  "✓ compiled successfully",

  "",

  "PS C:\\Users\\namanUwU> git status",

  "On branch main",

  "nothing to commit",

  "",

  "PS C:\\Users\\namanUwU> kewl shi I made",

  "all of it barely works but they still be kewl",

];



export default function TerminalHUD(){


  const [display,setDisplay] = useState("");

  const terminalRef = useRef<HTMLPreElement>(null);



  useEffect(()=>{


    let cancelled = false;



    async function runTerminal(){


      while(!cancelled){


        setDisplay("");



        for(const line of lines){


          if(cancelled) return;



          let current = "";



          for(const char of line){


            if(cancelled) return;



            current += char;



            setDisplay(prev => {

              const parts = prev.split("\n");

              parts[parts.length - 1] = current;

              return parts.join("\n");

            });



            await new Promise(resolve =>

              setTimeout(resolve,25)

            );


          }



          setDisplay(prev => prev + "\n");



          await new Promise(resolve =>

            setTimeout(resolve,180)

          );


        }


        await new Promise(resolve =>

          setTimeout(resolve,1200)

        );


      }


    }



    runTerminal();



    return ()=>{

      cancelled=true;

    };


  },[]);



  useEffect(()=>{


    if(terminalRef.current){

      terminalRef.current.scrollTop =
        terminalRef.current.scrollHeight;

    }


  },[display]);



  return (

    <div className={styles.terminal}>


<div className={styles.windowBar}>

  <span className={styles.windowTitle}>
    &gt;_ other projectss.exe
  </span>


  <span className={styles.online}>
    ● ONLINE
  </span>

</div>



      <div className={styles.terminalBody}>


        <pre ref={terminalRef}>

          {display}

          <span className={styles.cursor}>
            █
          </span>


        </pre>


      </div>


    </div>

  );

}