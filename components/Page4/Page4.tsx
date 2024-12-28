import { useState } from "react";
import Scene from "../Scene/Scene";
import styles from "./Page4.module.css";
import { RiFullscreenExitFill } from "react-icons/ri";

export default function Page4() {
  const [showVideo, setShowVideo] = useState(false);

  function ShowVideo() {
    setShowVideo(true);
  }

  function HideVideo() {
    setShowVideo(false);
  }

  return (
    <div className={styles.page}>
      <div className={styles.descriptionContainer}>
        <div className={styles.title}>Bachelor project</div>
        <div className={styles.description}>
          My bachelor’s project focused on developing a robotic system
          integrated with a desktop application. The desktop application, built
          using the Tauri framework and SQLite, provided key functionalities
          such as establishing a connection with the robot, start-stop it, and
          receiving field data. This data was used to generate a detailed map
          displaying the layout of the field and the location of each scanned
          plant. The robot, equipped with a YOLO-based model, was designed to
          scan the field and classify plants into two categories: healthy and
          unhealthy. Based on this classification, the robot used a laser-guided
          system to spray the appropriate chemicals on each plant, enabling
          precise and individualized care. This system offered users an
          efficient solution for monitoring and maintaining the health of crops
          with individual level of intervention.
        </div>
        <div onClick={ShowVideo} className={styles.button}>
          Show video
        </div>
        {showVideo && (
          <div className={styles.videoContainer}>
            <video
              src="/videos/Demonstration.mp4"
              className={styles.video}
              controls
            ></video>
          </div>
        )}
      </div>
      <Scene />
      {showVideo && (
        <RiFullscreenExitFill
          onClick={HideVideo}
          className={styles.exitButton}
        />
      )}
    </div>
  );
}
