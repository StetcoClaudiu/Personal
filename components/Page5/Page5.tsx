import { useRouter } from "next/navigation";
import styles from "./Page5.module.css";
import { useState } from "react";

export default function Page5() {
  const [hoveredSide, setHoveredSide] = useState<"left" | "right" | null>(null);
  const router = useRouter();

  const handleClick = (url: string) => {
    router.push(url);
  };

  return (
    <div className={styles.page}>
      <div className={styles.titleContainer}>Developed sites</div>
      <div className={styles.line}></div>
      <div
        onClick={() => handleClick("https://century-jewellery.store/")}
        className={`${styles.imageContainer} ${styles.leftContainer} ${
          hoveredSide === "left" ? styles.leftHovered : ""
        } ${hoveredSide === "right" ? styles.leftShrunk : ""}`}
        onMouseEnter={() => setHoveredSide("left")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <img
          src="/images/century.png"
          alt="Site example 1"
          className={styles.image}
        />
      </div>

      <div
        onClick={() => handleClick("http://dor-de-munte.site/")}
        className={`${styles.imageContainer} ${styles.rightContainer} ${
          hoveredSide === "right" ? styles.rightHovered : ""
        } ${hoveredSide === "left" ? styles.rightShrunk : ""}`}
        onMouseEnter={() => setHoveredSide("right")}
        onMouseLeave={() => setHoveredSide(null)}
      >
        <img
          src="/images/dor-de-munte.png"
          alt="Site example 2"
          className={styles.image}
          style={{ marginLeft: "20%" }}
        />
      </div>
    </div>
  );
}
