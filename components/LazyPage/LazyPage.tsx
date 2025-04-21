import { useState, useEffect, ReactNode, useRef } from "react";

interface LazyPageProps {
  children: ReactNode;
  index: number;
  pageRef: React.RefObject<HTMLDivElement>;
}

export default function LazyPage({ children, index, pageRef }: LazyPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { root: pageRef.current, rootMargin: "200px" }
    );

    const pageElement = document.getElementById(`page-${index}`);
    if (pageElement) observer.observe(pageElement);

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [index, pageRef]);

  return (
    <div id={`page-${index}`} style={{ minHeight: "100dvh" }}>
      {isVisible && children}
    </div>
  );
}
