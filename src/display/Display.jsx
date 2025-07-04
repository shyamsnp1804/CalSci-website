import React, { useRef, useEffect } from 'react';
import font5x7Data from './Font.jsx';

const hexToBitmap = (hexArray) => {
  const bitmap = Array(7).fill().map(() => Array(5).fill(0));
  for (let y = 0; y < 7; y++) {
    const bits = hexArray[y].toString(2).padStart(5, '0');
    for (let x = 0; x < 5; x++) {
      bitmap[y][x] = bits[x] === '1' ? 1 : 0;
    }
  }
  return bitmap;
};

const Display = ({ text }) => {
  const canvasRef = useRef(null);
  const bitmapCache = useRef({});

  useEffect(() => {
    const maxCharsPerLine = 21;
    const lines = [];
    let currentLine = '';
    for (let char of text || '') {
      if (currentLine.length < maxCharsPerLine) {
        currentLine += char;
      } else {
        lines.push(currentLine);
        currentLine = char;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    const displayLines = lines.slice(-8);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = false;

      const pixelSize = 3.54;
      const gap = 0.4;
      const pixelWithGap = pixelSize + gap;

      ctx.fillStyle = '#c0d8c0';
      for (let y = 0; y < 64; y++) {
        for (let x = 0; x < 128; x++) {
          ctx.fillRect(x * pixelWithGap, y * pixelWithGap, pixelSize, pixelSize);
        }
      }

      for (let lineIndex = 0; lineIndex < Math.min(displayLines.length, 8); lineIndex++) {
        const line = displayLines[lineIndex];
        let xOffset = 0;
        for (let char of line) {
          if (!bitmapCache.current[char] && font5x7Data[char]) {
            bitmapCache.current[char] = hexToBitmap(font5x7Data[char]);
          }
          const bitmap = bitmapCache.current[char] || hexToBitmap(font5x7Data[' ']);
          for (let y = 0; y < 7; y++) {
            for (let x = 0; x < 5; x++) {
              ctx.fillStyle = bitmap[y][x] ? '#000000' : '#c0d8c0';
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
      console.log(`Display: Rendered ${displayLines.length} lines on ST7565 simulator:`, displayLines);
    }
  }, [text]);

  return (
    <div className="border border-blue-200 flex flex-col items-center">
      <h1 className="text-sm font-semibold text-blue-800 mb-2 text-center">ST7565 Display (128x64)</h1>
      <canvas
        ref={canvasRef}
        width={128 * (3.54 + 0.4)}
        height={64 * (3.54 + 0.4)}
        style={{ width: '453.6px', height: '226.8px' }}
        className="bg-transparent mb-4"
      ></canvas>
    </div>
  );
};

export default Display;