import Carousel from "../Carousel/Carousel";
import styles from "./Page3.module.css";

export default function Page3() {
  return (
    <div className={styles.page}>
      <div className={styles.title}>Diplomas and awards</div>
      <div className={styles.cardsContainer}>
        <Carousel />
      </div>
    </div>
  );
}
