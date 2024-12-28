import styles from "./Diploma.module.css";

interface AwardProps {
  title?: string;
  name?: string;
  department?: string;
  year?: string;
  website?: string;
}

export default function Diploma({
  title,
  name,
  department,
  year,
  website,
}: AwardProps) {
  return (
    <div className={styles.page}>
      <div className={styles.title}>{title}</div>
      <div className={styles.name}>{name}</div>
      <div className={styles.department}>Department: {department}</div>
      <div className={styles.year}>Edition: {year}</div>
      <div className={styles.linkText}>Link: </div>
      <a className={styles.website} href={website}>
        {website}
      </a>
    </div>
  );
}
