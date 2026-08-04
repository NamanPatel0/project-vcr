"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import styles from "./page.module.css";


export default function AboutPage() {

  const router = useRouter();


  return (

    <main className={styles.page}>


      <button
        className={styles.back}
        onClick={() => router.push("/")}
      >
        Back
      </button>



      <motion.section
        layoutId="hello-section"
        className={styles.header}
      >

        <h2>
          Hello
        </h2>

        <p>
          my name is
        </p>

      </motion.section>




      <section className={styles.content}>


        <motion.h1
          layoutId="name-text"
        >
          Naman Patel
        </motion.h1>



        <motion.p
          initial={{
            opacity:0,
            y:20,
          }}

          animate={{
            opacity:1,
            y:0,
          }}

          transition={{
            duration:.8,
            delay:.3,
          }}
        >
          I am a developer and designer who enjoys building creative digital
          experiences. I work on web development, software projects, and
          exploring new technologies.
        </motion.p>


      </section>


    </main>

  );
}