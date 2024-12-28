"use client";
import Page1 from "@/components/Page1/Page1";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import Left from "@/components/Left/Left";
import Right from "@/components/Right/Right";

export default function Home() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1000);
  }, []);
  return (
    <div className={styles.page}>
      <div
        className={`${styles.welcomeMessageContainer} ${
          show ? styles.hide : ""
        }`}
      >
        <div className={`${styles.welcomeMessage} ${show ? styles.hide : ""}`}>
          Welcome to my personal site!
        </div>
      </div>
      <Left />
      <Right />
    </div>
  );
}
