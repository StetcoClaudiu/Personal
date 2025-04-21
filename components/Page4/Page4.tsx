import { useState, useRef } from "react";
import Scene from "../Scene/Scene";
import styles from "./Page4.module.css";
import { RiFullscreenExitFill } from "react-icons/ri";
import ChooseModel from "../ChooseModel/ChooseModel";

// Update the interface to include camera position
interface ModelContent {
  title: string;
  description: string;
  modelPath: string;
  videoPath: string;
  cameraPosition: {
    x: number;
    y: number;
    z: number;
  };
}

type ModelId = "model1" | "model2";

export default function Page4() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<ModelId>("model1");
  const pageRef = useRef<HTMLDivElement>(null);

  // Add camera positions and video paths to each model
  const modelContent: Record<ModelId, ModelContent> = {
    model1: {
      title: "Bachelor project",
      description:
        "My bachelor's project focused on developing a robotic system integrated with a desktop application. The desktop application, built using the Tauri framework and SQLite, provided key functionalities such as establishing a connection with the robot, start-stop it, and receiving field data. This data was used to generate a detailed map displaying the layout of the field and the location of each scanned plant. The robot, equipped with a YOLO-based model, was designed to scan the field and classify plants into two categories: healthy and unhealthy. Based on this classification, the robot used a laser-guided system to spray the appropriate chemicals on each plant, enabling precise and individualized care. This system offered users an efficient solution for monitoring and maintaining the health of crops with individual level of intervention.",
      modelPath: "/models/robot.glb",
      videoPath: "/videos/Demonstration.mp4",
      cameraPosition: {
        x: -200,
        y: 200,
        z: 200,
      },
    },
    model2: {
      title: "3D Printer",
      description:
        "During my university studies, I designed and constructed a CoreXY 3D printer. I utilized SOLIDWORKS for the design process and component compatibility verification, which ensured all parts fitted together precisely. While most components were sourced and imported from existing designs, I designed several custom parts to meet specific requirements. For the printer's operation, I implemented Marlin firmware with custom configurations for my hardware specifications.",
      modelPath: "/models/robot2.glb",
      videoPath: "/videos/Demonstration2.mp4",
      cameraPosition: {
        x: 800,
        y: 600,
        z: 800,
      },
    },
  };

  function showVideo(modelId: ModelId): void {
    setActiveVideo(modelContent[modelId].videoPath);
  }

  function hideVideo(): void {
    setActiveVideo(null);
  }

  function handleModelSelect(modelId: ModelId): void {
    if (modelId !== selectedModel) {
      // Simply change the selected model - the CSS classes will handle the animations
      setSelectedModel(modelId);
      // If a video is playing, hide it when switching models
      if (activeVideo) {
        hideVideo();
      }
    }
  }

  const currentContent = modelContent[selectedModel];

  return (
    <div className={styles.page} ref={pageRef}>
      <div className={styles.descriptionContainer}>
        {/* Model 1 Container */}
        <div
          className={`${styles.modelContainer} ${styles.model1Container} ${
            selectedModel === "model1" ? styles.normal : styles.hide
          }`}
        >
          <div className={styles.title}>{modelContent.model1.title}</div>
          <div className={styles.description}>
            {modelContent.model1.description}
          </div>
          <div onClick={() => showVideo("model1")} className={styles.button}>
            Show video
          </div>
        </div>

        {/* Model 2 Container */}
        <div
          className={`${styles.modelContainer} ${styles.model2Container} ${
            selectedModel === "model2" ? styles.normal : styles.hide
          }`}
        >
          <div className={styles.title}>{modelContent.model2.title}</div>
          <div className={styles.description}>
            {modelContent.model2.description}
          </div>
          <div onClick={() => showVideo("model2")} className={styles.button}>
            Show video
          </div>
        </div>

        {activeVideo && (
          <div className={styles.videoContainer}>
            <video src={activeVideo} className={styles.video} controls></video>
          </div>
        )}
      </div>
      <Scene
        key={selectedModel}
        modelPath={currentContent.modelPath}
        cameraPosition={currentContent.cameraPosition}
      />
      {activeVideo && (
        <RiFullscreenExitFill
          onClick={hideVideo}
          className={styles.exitButton}
        />
      )}
      <div className={styles.choose_model}>
        <ChooseModel
          onSelectModel={handleModelSelect}
          selectedModel={selectedModel}
        />
      </div>
    </div>
  );
}
