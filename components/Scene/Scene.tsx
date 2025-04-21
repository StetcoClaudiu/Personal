"use client";
import { useEffect, useRef } from "react";
import styles from "./Scene.module.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

interface SceneProps {
  modelPath: string;
  cameraPosition: {
    x: number;
    y: number;
    z: number;
  };
}

export default function Scene({ modelPath, cameraPosition }: SceneProps) {
  const sceneContainerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!sceneContainerRef.current) return;

    const container = sceneContainerRef.current;

    // Initialize scene if not already created
    if (!sceneRef.current) {
      sceneRef.current = new THREE.Scene();
    }

    // Initialize camera if not already created
    if (!cameraRef.current) {
      cameraRef.current = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        100000
      );
    }

    // Set camera position based on props
    cameraRef.current.position.set(
      cameraPosition.x,
      cameraPosition.y,
      cameraPosition.z
    );
    cameraRef.current.lookAt(0, 0, 0);

    // Initialize renderer if not already created
    if (!rendererRef.current) {
      rendererRef.current = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        preserveDrawingBuffer: true,
      });
      rendererRef.current.setPixelRatio(window.devicePixelRatio);
      container.appendChild(rendererRef.current.domElement);
    }

    rendererRef.current.setSize(container.clientWidth, container.clientHeight);

    // Setup lighting
    if (sceneRef.current.children.length === 0) {
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      sceneRef.current.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1000, 1000, 1000);
      sceneRef.current.add(directionalLight);
    }

    // Setup orbit controls if not already created
    if (!controlsRef.current && cameraRef.current && rendererRef.current) {
      controlsRef.current = new OrbitControls(
        cameraRef.current,
        rendererRef.current.domElement
      );
      controlsRef.current.enableDamping = true;
      controlsRef.current.dampingFactor = 0.05;
      controlsRef.current.screenSpacePanning = true;
      controlsRef.current.minDistance = 100;
      controlsRef.current.maxDistance = 5000;
      controlsRef.current.maxPolarAngle = Math.PI / 1.5;
      controlsRef.current.enableZoom = true;
      controlsRef.current.zoomSpeed = 1.0;
      controlsRef.current.enableRotate = true;
      controlsRef.current.rotateSpeed = 1.0;
      controlsRef.current.enablePan = true;
      controlsRef.current.panSpeed = 1.0;

      // Remove need for shift key by explicitly setting mouse buttons
      // Default: left=rotate, middle/wheel=zoom, right=pan
      controlsRef.current.mouseButtons = {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN,
      };

      // Set keyboard controls
      controlsRef.current.keyPanSpeed = 20;
    }

    // Remove previous model if it exists
    if (modelRef.current) {
      sceneRef.current.remove(modelRef.current);
      modelRef.current = null;
    }

    // Load the model
    const loader = new GLTFLoader();

    // Check if modelPath is valid before loading
    if (modelPath && typeof modelPath === "string" && modelPath.trim()) {
      loader.load(
        modelPath,
        (gltf) => {
          modelRef.current = gltf.scene;
          if (sceneRef.current) {
            // Center the model
            const box = new THREE.Box3().setFromObject(gltf.scene);
            const center = box.getCenter(new THREE.Vector3());
            gltf.scene.position.x = -center.x;
            gltf.scene.position.y = -center.y;
            gltf.scene.position.z = -center.z;

            sceneRef.current.add(gltf.scene);

            if (controlsRef.current) {
              controlsRef.current.target.set(0, 0, 0);
              controlsRef.current.update();
            }
          }
        },
        (error) => {
          console.error("An error occurred loading the model:", error);
        }
      );
    } else {
      console.warn("Invalid model path provided:", modelPath);
    }

    // Resize handler
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);

      if (controlsRef.current) {
        controlsRef.current.update();
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    animate();

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      resizeObserver.disconnect();

      // Do not remove the renderer DOM element on unmount
      // This prevents the canvas from being destroyed during scrolling
    };
  }, [modelPath]); // Only re-run if modelPath changes, handle camera updates separately

  // Handle camera position updates without recreating the entire scene
  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(
        cameraPosition.x,
        cameraPosition.y,
        cameraPosition.z
      );
      cameraRef.current.lookAt(0, 0, 0);

      if (controlsRef.current) {
        controlsRef.current.update();
      }
    }
  }, [cameraPosition]);

  return (
    <div ref={sceneContainerRef} className={styles.SceneContainer}>
      <div className={styles.controls}></div>
    </div>
  );
}
