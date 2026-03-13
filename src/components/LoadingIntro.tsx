import { useEffect, useRef } from "react";

interface LoadingIntroProps {
  onComplete: () => void;
}

const LoadingIntro = ({ onComplete }: LoadingIntroProps) => {
  const completedRef = useRef(false);

  const complete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  useEffect(() => {
    const fallbackTimer = window.setTimeout(complete, 4500);
    return () => window.clearTimeout(fallbackTimer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <video
        className="w-[min(86vw,480px)] max-h-[70vh] object-contain rounded-2xl"
        src="/intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={complete}
        onError={complete}
      />
    </div>
  );
};

export default LoadingIntro;
