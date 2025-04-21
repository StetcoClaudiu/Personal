import styles from "./Right.module.css";
import Page1 from "../Page1/Page1";
import Page2 from "../Page2/Page2";
import Page3 from "../Page3/Page3";
import Page4 from "../Page4/Page4";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useEffect, useRef, useState } from "react";
import LazyPage from "../LazyPage/LazyPage";
import Page5 from "../Page5/Page5";

export default function Right() {
  const [page, setPage] = useState(1);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pageElement = pageRef.current;

    const handleScroll = () => {
      if (!pageRef.current) return;

      const scrollTop = pageRef.current.scrollTop;
      const pageHeight = pageRef.current.clientHeight;
      setPage(scrollTop / pageHeight + 1);
    };

    pageElement?.addEventListener("scroll", handleScroll);

    return () => pageElement?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={pageRef} className={styles.page}>
      <div className={styles.ProgressBarContainer}>
        <ProgressBar total={5} progress={page}></ProgressBar>
      </div>
      <LazyPage index={0} pageRef={pageRef}>
        <Page1 pageRef={pageRef} />
      </LazyPage>
      <LazyPage index={1} pageRef={pageRef}>
        <Page2 />
      </LazyPage>
      <LazyPage index={2} pageRef={pageRef}>
        <Page3 />
      </LazyPage>
      <LazyPage index={3} pageRef={pageRef}>
        <Page4 />
      </LazyPage>
      <LazyPage index={4} pageRef={pageRef}>
        <Page5 />
      </LazyPage>
    </div>
  );
}
