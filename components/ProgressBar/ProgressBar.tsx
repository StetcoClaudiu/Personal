import { useEffect, useState } from "react";
import styles from "./ProgressBar.module.css";

interface ProgressBarProps {
  progress: number;
  total: number;
}

export default function ProgressBar({ progress, total }: ProgressBarProps) {
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    setPercentage((progress * 100) / total);
  }, [progress]);
  return (
    <div className={styles.total}>
      <div
        className={styles.progress}
        style={{ height: `${percentage}%` }}
      ></div>
    </div>
  );
}
