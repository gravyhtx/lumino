import React, { useRef, useEffect } from 'react';

type CanvasToImageSaverProps = {
  draw: (ctx: CanvasRenderingContext2D) => void; // Function to draw on the canvas
  filename: string; // Filename for the saved image
  width?: number; // Canvas width
  height?: number; // Canvas height
};

const CanvasToImageSaver: React.FC<CanvasToImageSaverProps> = ({ draw, filename, width = 200, height = 200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        draw(ctx); // Call the provided drawing function
      }
    }
  }, [draw]);

  const saveCanvasAsImage = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `${filename}.png`; // Use the provided filename
      link.click();
    }
  };

  return (
    <div>
      <canvas ref={canvasRef} width={width} height={height}></canvas>
      <button onClick={saveCanvasAsImage}>Save as Image</button>
    </div>
  );
};

export default CanvasToImageSaver;