import React, { useRef, useEffect } from "react";
import { usePython } from "../codeEditorLogic/pythonLogic";
import font5x7Data from "./Font";

const hexToBitmap = (hexArray) => {
  const bitmap = Array(7)
    .fill()
    .map(() => Array(5).fill(0));
  for (let y = 0; y < 7; y++) {
    const bits = hexArray[y].toString(2).padStart(5, "0");
    for (let x = 0; x < 5; x++) {
      bitmap[y][x] = bits[x] === "1" ? 1 : 0;
    }
  }
  return bitmap;
};

const Display = () => {
  const canvasRef = useRef(null);
  const bitmapCache = useRef({});
  const { output } = usePython();

  useEffect(() => {
    // Prepare display lines from output
    const maxCharsPerLine = 21;
    const lines = [];
    let currentLine = "";
    for (let item of output) {
      const text = String(item).slice(0, maxCharsPerLine); // Max 21 chars
      if (currentLine.length + text.length <= maxCharsPerLine) {
        currentLine += text;
      } else {
        lines.push(currentLine);
        currentLine = text;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    const finalLines = lines.slice(-8); // Max 8 lines for ST7565

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.imageSmoothingEnabled = false;

      const pixelSize = 5;
      const gap = 1;
      const pixelWithGap = pixelSize + gap;

      // Clear canvas with background color
      ctx.fillStyle = "#c0d8c0";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Render text
      for (let lineIndex = 0; lineIndex < Math.min(finalLines.length, 8); lineIndex++) {
        const line = finalLines[lineIndex];
        let xOffset = 0;
        for (let char of line) {
          if (!bitmapCache.current[char] && font5x7Data[char]) {
            bitmapCache.current[char] = hexToBitmap(font5x7Data[char]);
          }
          const bitmap = bitmapCache.current[char] || hexToBitmap(font5x7Data[" "]);
          for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 5; x++) {
              ctx.fillStyle = bitmap[y][x] ? "#000000" : "#c0d8c0";
              ctx.fillRect(
                xOffset + x * pixelWithGap,
                lineIndex * 7 * pixelWithGap + y * pixelWithGap,
                pixelSize,
                pixelSize
              );
            }
          }
          xOffset += 6 * pixelWithGap;
        }
      }
    }
  }, [output]);

  return (
    <div className="border border-blue-200 flex flex-col items-center">
      <h1 className="text-sm font-semibold text-blue-800 mb-2 text-center">
        CalSci Display
      </h1>
      <canvas
        ref={canvasRef}
        width={128 * (5 + 1)}
        height={64 * (5 + 1)}
        style={{ width: "453.6px", height: "226.8px" }}
        className="bg-transparent mb-4"
      ></canvas>
    </div>
  );
};

export default Display;
