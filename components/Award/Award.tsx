import styles from "./Award.module.css";

interface AwardProps {
  name?: string;
  year?: string;
  place?: string;
  website?: string;
}

export default function Diploma({ name, year, place, website }: AwardProps) {
  return (
    <div className={styles.page}>
      <div className={styles.title}>Diploma</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.year}>Edition: {year}</div>
      <div className={styles.place}>Place: {place}</div>
      <div className={styles.linkText}>Link: </div>

      <a className={styles.website} href={website}>
        {website}
      </a>
    </div>
  );
}
