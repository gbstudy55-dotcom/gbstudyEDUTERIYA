import { useEffect, useRef } from 'react';
import { initGBStudy } from './gbStudyApp.js';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      initGBStudy(containerRef.current);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--tx)] antialiased">
      <div id="app" ref={containerRef} />
    </div>
  );
}
