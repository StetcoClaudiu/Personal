import { useEffect, useRef, useState } from "react";
import styles from "./Page2.module.css";
import { ReactSVG } from "react-svg";
import { Content } from "../ContentLanguage/ContentLanguage";

export default function Page2() {
  const content = Content;
  const [current, setCurrent] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const halfHeight = scrollRef.current.clientHeight / 2;
        const scrollTop = scrollRef.current.scrollTop;
        const scrollValue = Math.floor(scrollTop / ((halfHeight * 3) / 4));
        setCurrent(Math.min(scrollValue, content.length - 1));
      }
    };
    scrollRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      scrollRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.pageMask}></div>
      <div ref={scrollRef} className={styles.descriptionSection}>
        <div className={styles.margin} />
        {content.map((item, index) => (
          <div
            key={index}
            className={`${styles.descriptionContainer} ${
              index === current ? styles.current : ""
            }`}
          >
            <div className={styles.title}>{item.title}</div>
            <div className={styles.description}>{item.description}</div>
          </div>
        ))}
        <div className={styles.margin} />
      </div>
      <div className={styles.logoSection}>
        {content.map((item, index) => (
          <div key={index}>
            <ReactSVG
              src={`${item.image}`}
              className={`${styles.logo} ${
                current > index
                  ? styles.top
                  : current < index
                  ? styles.bottom
                  : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
