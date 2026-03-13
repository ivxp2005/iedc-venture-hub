import { useEffect, useRef } from "react";
import loadingVideo from "@/assets/images/loading page.mp4";

interface LoadingIntroProps {
  onComplete: () => void;
}

const LoadingIntro = ({ onComplete }: LoadingIntroProps) => {
  const completedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const complete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultPlaybackRate = 2;
      videoRef.current.playbackRate = 2;
    }

    const fallbackTimer = window.setTimeout(complete, 4500);
    return () => window.clearTimeout(fallbackTimer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
      <video
        ref={videoRef}
        className="w-[min(86vw,480px)] max-h-[70vh] object-contain rounded-2xl"
        src={loadingVideo}
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
