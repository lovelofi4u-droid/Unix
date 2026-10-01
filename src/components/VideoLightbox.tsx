import { useEffect } from "react";
import { createPortal } from "react-dom";

type Props = { src: string; onClose: () => void };

export function VideoLightbox({ src, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(5,10,20,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          width: 44,
          height: 44,
          borderRadius: 999,
          border: 0,
          background: "rgba(255,255,255,0.15)",
          color: "#fff",
          fontSize: 22,
          cursor: "pointer",
        }}
      >
        ✕
      </button>

      <video
        src={src}
        controls
        autoPlay
        playsInline
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "92vw",
          maxHeight: "86vh",
          borderRadius: 16,
          background: "#000",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5)",
        }}
      />
    </div>,
    document.body,
  );
}