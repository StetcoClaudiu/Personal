import { useEffect, useRef, useState } from "react";
import styles from "./Page1.module.css";

import { IoIosArrowDown } from "react-icons/io";

interface Page1Props {
  pageRef: React.RefObject<HTMLDivElement>;
}

export default function Page1({ pageRef }: Page1Props) {
  const [glow, setGlow] = useState(false);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGlow((glow) => !glow);
    }, 1000);

    if (pageRef) {
      pageRef.current?.addEventListener("scroll", () => {
        setHide(true);
      });
    }

    setTimeout(() => {
      setHide(false);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageContent}>
        <div className={styles.title}>About me</div>
        <div className={styles.description}>
          Today, I'm excited to share my journey in Information Technology with
          you. My name is Ștețco Claudiu, and I am currently pursuing my
          master's degree in Applied Computational Intelligence at Babeș-Bolyai
          University. My goal is to understand the latest tech trends and
          contribute meaningfully to the field. I love learning and
          problem-solving in IT. Over the years, I've gained a solid foundation
          in Informatics at Babeș-Bolyai University, where I've learned various
          programming languages and software development skills. I enjoy
          tackling tough challenges and finding creative solutions. I'm
          passionate about exploring new ideas and making a positive impact with
          technology. This presentation aims to showcase my IT journey and
          dedication to learning and improving. My journey in IT is all about
          passion, perseverance, and continuous learning. I'm excited to keep
          exploring new opportunities and making a difference in the tech world.
        </div>
        <div
          className={`${styles.scrollMessage} ${glow ? styles.glow : ""} ${
            hide ? styles.hide : ""
          }`}
        >
          <div>Scroll down</div>
          <IoIosArrowDown className={styles.icon} />
        </div>
      </div>
    </div>
  );
}
