"use client";
import { useEffect, useRef } from "react";
import styles from "./Scene.module.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

export default function Scene() {
  const SceneContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SceneContainer.current) return;

    const container = SceneContainer.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      100000
    );
    camera.position.setZ(200);
    camera.position.setY(200);
    camera.position.setX(-200);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load("/models/robot.glb", (gltf) => {
      scene.add(gltf.scene);
    });

    const resizeObserver = new ResizeObserver(() => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;

      console.log("New Dimensions:", newWidth, newHeight);

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    });
    resizeObserver.observe(container);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      resizeObserver.disconnect();
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, [SceneContainer]);

  return <div ref={SceneContainer} className={styles.SceneContainer}></div>;
}
