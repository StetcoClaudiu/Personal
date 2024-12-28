import styles from "./Left.module.css";
import { FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneFlip } from "react-icons/fa6";

export default function Left() {
  return (
    <div className={styles.page}>
      <img
        src="/images/profile-image.jpg"
        alt="Profile Image"
        className={styles.image}
      />
      <div className={styles.name}>Ștețco Claudiu</div>
      <div className={styles.infoLine}>
        <FaGithub className={styles.icon} />
        <a className={styles.infoGit} href="https://github.com/StetcoClaudiu">
          https://github.com/StetcoClaudiu
        </a>
      </div>
      <div className={styles.infoLine}>
        <MdEmail className={styles.icon} />
        <div className={styles.info}>stetcoclaudiu1002@gmail.com</div>
      </div>
      <div className={styles.infoLine}>
        <FaLocationDot className={styles.icon} />
        <div className={styles.info}>Romania, Cluj, Cluj-Napoca</div>
      </div>
      <div className={styles.infoLine}>
        <FaPhoneFlip className={styles.icon} />
        <div className={styles.info}>+40754401799</div>
      </div>
    </div>
  );
}
