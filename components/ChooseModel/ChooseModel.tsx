import styles from "./ChooseModel.module.css";

interface ChooseModelProps {
  onSelectModel: (modelId: "model1" | "model2") => void;
  selectedModel: "model1" | "model2";
}

export default function ChooseModel({
  onSelectModel,
  selectedModel,
}: ChooseModelProps) {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.option} ${
          selectedModel === "model1" ? styles.selected : ""
        }`}
        style={{ left: "6%" }}
        onClick={() => onSelectModel("model1")}
      >
        <img src="/images/Assem1.PNG" className={styles.model} alt="Model 1" />
      </div>
      <div
        className={`${styles.option} ${
          selectedModel === "model2" ? styles.selected : ""
        }`}
        onClick={() => onSelectModel("model2")}
      >
        <img src="/images/Assem2.PNG" className={styles.model} alt="Model 2" />
      </div>
    </div>
  );
}
