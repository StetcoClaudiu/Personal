import React, { useState, useEffect, useRef } from "react";
import styles from "./Carousel.module.css";
import AwardDiploma from "../ContentAwardDiploma/ContentAwardDiploma";
import { BsArrowLeftSquareFill, BsArrowRightSquareFill } from "react-icons/bs";

export default function Carousel() {
  const data = [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }];

  const content = data.map((item, idx) => (
    <AwardDiploma key={idx} index={item.index} />
  ));

  const [current, setCurrent] = useState(1);
  const [activate, setActivate] = useState(true);
  const [activateRight, setActivateRight] = useState(true);
  const [activateLeft, setActivateLeft] = useState(true);
  const pageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const scrollToMiddle = () => {
    if (pageRef.current) {
      const containerWidth = pageRef.current.scrollWidth;
      const visibleWidth = pageRef.current.clientWidth;

      pageRef.current.scrollTo({
        left: (containerWidth - visibleWidth) / 2,
      });
    }
  };

  const smoothScrollTo = (targetLeft: number, duration: number): void => {
    if (pageRef.current) {
      const start = pageRef.current.scrollLeft;
      const change = targetLeft - start;
      const startTime = performance.now();

      const animateScroll = () => {
        const elapsedTime = performance.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentLeft = start + change * progress;

        if (pageRef.current) {
          pageRef.current.scrollLeft = currentLeft;
        }

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      animateScroll();
    }
  };

  const left = () => {
    if (pageRef.current && cardRef.current && activate) {
      const containerWidth = pageRef.current.scrollWidth;
      const visibleWidth = pageRef.current.clientWidth;
      const cardWidth = cardRef.current.clientWidth;

      smoothScrollTo((containerWidth - visibleWidth) / 2 - cardWidth, 500);
      setActivate(false);
      setActivateLeft(false);
      setTimeout(() => {
        scrollToMiddle();
        setCurrent((prev) => (prev - 1 + content.length) % content.length);
        setActivate(true);
        setActivateLeft(true);
      }, 550);
    }
  };

  const right = () => {
    if (pageRef.current && cardRef.current && activate) {
      const containerWidth = pageRef.current.scrollWidth;
      const visibleWidth = pageRef.current.clientWidth;
      const cardWidth = cardRef.current.clientWidth;

      smoothScrollTo((containerWidth - visibleWidth) / 2 + cardWidth, 500);
      setActivate(false);
      setActivateRight(false);
      setTimeout(() => {
        scrollToMiddle();
        setCurrent((prev) => (prev + 1) % content.length);
        setActivate(true);
        setActivateRight(true);
      }, 550);
    }
  };

  useEffect(() => {
    if (pageRef.current) {
      scrollToMiddle();
      window.addEventListener("resize", scrollToMiddle);
    }
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.buttonLeft} onClick={left}>
        <BsArrowLeftSquareFill />
      </div>
      <div className={styles.buttonRight} onClick={right}>
        <BsArrowRightSquareFill />
      </div>
      <div ref={pageRef} className={styles.page}>
        <div ref={cardRef} className={`${styles.cardContainer} ${styles.left}`}>
          <div
            className={`${styles.card} ${styles.left} ${styles.marginLeft} ${
              activateLeft ? "" : styles.appear
            }`}
          >
            {content[(current + content.length - 2) % content.length]}
          </div>
        </div>
        <div className={`${styles.cardContainer} ${styles.left}`}>
          <div
            className={`${styles.card} ${activateLeft ? "" : styles.activate} ${
              activateRight ? "" : styles.disappearLeft
            }`}
          >
            {content[(current + content.length - 1) % content.length]}
          </div>
        </div>
        <div className={styles.cardContainer}>
          <div
            className={`${styles.card} ${
              activate ? styles.activateMiddle : styles.deactivate
            }`}
          >
            {content[current]}
          </div>
        </div>
        <div className={`${styles.cardContainer} ${styles.right}`}>
          <div
            className={`${styles.card} ${styles.right} ${
              activateRight ? "" : styles.activate
            } ${activateLeft ? "" : styles.disappearRight}`}
          >
            {content[(current + content.length + 1) % content.length]}
          </div>
        </div>
        <div className={`${styles.cardContainer} ${styles.right}`}>
          <div
            className={`${styles.card} ${styles.right} ${styles.marginRight} ${
              activateRight ? "" : styles.appear
            }`}
          >
            {content[(current + content.length + 2) % content.length]}
          </div>
        </div>
      </div>
    </div>
  );
}
