'use client';

import { useCallback, useEffect, useRef } from 'react';

type Point = { x: number; y: number; value?: number };
type Line = { xStart: number; yStart: number; xEnd: number; yEnd: number };
type Matrix = number[][];

const GREY = '#e0e0e0';
const BLACK = '#000000';

export default function SierpinskiWidget() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeoutsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const scheduleTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timeoutsRef.current.delete(id);
      fn();
    }, ms);
    timeoutsRef.current.add(id);
    return id;
  }, []);

  const cancelAllTimeouts = useCallback(() => {
    for (const id of timeoutsRef.current) {
      clearTimeout(id);
    }
    timeoutsRef.current.clear();
  }, []);

  useEffect(() => cancelAllTimeouts, [cancelAllTimeouts]);

  const getContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const context = canvas.getContext('2d');
    if (!context) return null;
    return { canvas, context };
  };

  const clearCanvas = () => {
    const ctx = getContext();
    if (!ctx) return;
    const { canvas, context } = ctx;
    context.clearRect(0, 0, canvas.width, canvas.height);
    const w = canvas.width;
    canvas.width = 1;
    canvas.width = w;
  };

  const additionSierpinski = useCallback(() => {
    cancelAllTimeouts();
    const ctx = getContext();
    if (!ctx) return;
    const { canvas, context } = ctx;

    clearCanvas();

    const rows = 64;
    const initialRow: Point[] = [{ x: canvas.width / 2, y: 10, value: 1 }];
    context.fillText(String(initialRow[0].value), initialRow[0].x, initialRow[0].y);

    const drawRow = (rowDepth: number, previousRow: Point[]) => {
      const currentRow: Point[] = [];
      currentRow[0] = {
        value: 1,
        x: previousRow[0].x - 5,
        y: 10 + (rowDepth / (rows - 1)) * 546,
      };
      currentRow[previousRow.length] = {
        value: 1,
        x: previousRow[previousRow.length - 1].x + 5,
        y: 10 + (rowDepth / (rows - 1)) * 546,
      };

      for (let i = 0; i < previousRow.length - 1; ++i) {
        currentRow[i + 1] = {
          value: ((previousRow[i].value ?? 0) + (previousRow[i + 1].value ?? 0)) % 10,
          x: currentRow[i].x + 10,
          y: currentRow[i].y,
        };
      }

      for (let i = 0; i < currentRow.length; ++i) {
        context.fillStyle = (currentRow[i].value ?? 0) % 2 === 0 ? GREY : BLACK;
        context.fillText(String(currentRow[i].value), currentRow[i].x, currentRow[i].y);
      }

      if (rowDepth < rows - 1) {
        scheduleTimeout(() => drawRow(rowDepth + 1, currentRow), 3000 / rowDepth);
      }
    };

    scheduleTimeout(() => drawRow(1, initialRow), 3000);
  }, [cancelAllTimeouts, scheduleTimeout]);

  const randomSierpinski = useCallback(() => {
    cancelAllTimeouts();
    const ctx = getContext();
    if (!ctx) return;
    const { canvas, context } = ctx;

    clearCanvas();

    const colourPoint = (point: Point) => {
      context.beginPath();
      context.arc(point.x, point.y, 1, 0, 2 * Math.PI);
      context.closePath();
      context.stroke();
    };

    const vertices: Point[] = [
      { x: canvas.width / 2.0 + 3, y: 7.0 },
      { x: 13.0, y: canvas.height - 13.0 },
      { x: canvas.width - 7.0, y: canvas.height - 13.0 },
    ];
    vertices.forEach(colourPoint);

    const startingPoint: Point = { x: vertices[0].x, y: vertices[0].y };
    colourPoint(startingPoint);

    const randomPoint = (pointNumber: number, previousPoint: Point) => {
      const randomVertex = vertices[Math.round(Math.random() * 3) % 3];
      const currentPoint: Point = {
        x: previousPoint.x + (randomVertex.x - previousPoint.x) / 2,
        y: previousPoint.y + (randomVertex.y - previousPoint.y) / 2,
      };
      colourPoint(currentPoint);

      if (pointNumber < 7500) {
        scheduleTimeout(() => randomPoint(pointNumber + 1, currentPoint), 1000 / pointNumber);
      }
    };

    scheduleTimeout(() => randomPoint(1, startingPoint), 1000);
  }, [cancelAllTimeouts, scheduleTimeout]);

  const fractalSierpinski = useCallback(() => {
    cancelAllTimeouts();
    const ctx = getContext();
    if (!ctx) return;
    const { canvas, context } = ctx;

    const drawLine = (xStart: number, yStart: number, xEnd: number, yEnd: number) => {
      context.beginPath();
      context.moveTo(xStart, yStart);
      context.lineTo(xEnd, yEnd);
      context.closePath();
      context.stroke();
    };

    const matrixMultiply = (vector: number[], matrix: Matrix): number[] => {
      const out = [0, 0, 0];
      for (let i = 0; i < matrix.length; ++i) {
        let result = 0;
        for (let j = 0; j < matrix[0].length; ++j) {
          result += matrix[j][i] * vector[j];
        }
        out[i] = result;
      }
      return out;
    };

    const applyMatrixToLine = (line: Line, matrix: Matrix) => {
      const start = matrixMultiply([line.xStart, line.yStart, 1.0], matrix);
      line.xStart = start[0];
      line.yStart = start[1];
      const end = matrixMultiply([line.xEnd, line.yEnd, 1.0], matrix);
      line.xEnd = end[0];
      line.yEnd = end[1];
    };

    const translate = (line: Line, x: number, y: number) => {
      const m: Matrix = [
        [1.0, 0.0, 0.0],
        [0.0, 1.0, 0.0],
        [x, y, 1.0],
      ];
      applyMatrixToLine(line, m);
    };

    const scale = (line: Line, factor: number) => {
      const m: Matrix = [
        [factor, 0.0, 0.0],
        [0.0, factor, 0.0],
        [0.0, 0.0, 1.0],
      ];
      const xInitial = line.xStart;
      const yInitial = line.yStart;
      translate(line, -xInitial, -yInitial);
      applyMatrixToLine(line, m);
      translate(line, xInitial, yInitial);
    };

    const rotate = (line: Line, radians: number) => {
      const m: Matrix = [
        [Math.cos(radians), -Math.sin(radians), 0.0],
        [Math.sin(radians), Math.cos(radians), 0.0],
        [0.0, 0.0, 1.0],
      ];
      const xInitial = line.xStart;
      const yInitial = line.yStart;
      translate(line, -xInitial, -yInitial);
      applyMatrixToLine(line, m);
      translate(line, xInitial, yInitial);
    };

    const recursiveFractal = (line: Line, i: number, turnClockwise: boolean) => {
      let rotateBy = Math.PI / 3;
      if (turnClockwise) rotateBy = -rotateBy;

      if (i > 0) {
        scale(line, 0.5);
        rotate(line, rotateBy);
        recursiveFractal(line, i - 1, !turnClockwise);
        rotateBy = -rotateBy;
        rotate(line, rotateBy);
        recursiveFractal(line, i - 1, turnClockwise);
        rotate(line, rotateBy);
        recursiveFractal(line, i - 1, !turnClockwise);
        rotateBy = -rotateBy;
        rotate(line, rotateBy);
        scale(line, 2.0);
        return;
      }

      drawLine(line.xStart, line.yStart, line.xEnd, line.yEnd);
      translate(line, line.xEnd - line.xStart, line.yEnd - line.yStart);
    };

    const drawTriangle = (i: number) => {
      const line: Line = {
        xStart: 13.0,
        yStart: canvas.height - 13.0,
        xEnd: canvas.width - 7.0,
        yEnd: canvas.height - 13.0,
      };
      scheduleTimeout(() => {
        clearCanvas();
        recursiveFractal(line, i, false);
      }, 5000 * Math.pow(i, 0.6));
    };

    for (let i = 0; i < 11; ++i) {
      drawTriangle(i);
    }
  }, [cancelAllTimeouts, scheduleTimeout]);

  return (
    <div id="sierpinski-widget" className="my-8">
      <div className="flex flex-wrap gap-3 justify-center my-6">
        <button
          type="button"
          onClick={additionSierpinski}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Adding Numbers
        </button>
        <button
          type="button"
          onClick={randomSierpinski}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Random Points
        </button>
        <button
          type="button"
          onClick={fractalSierpinski}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Fractal
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={640}
        height={570}
        className="mx-auto border border-gray-300 rounded"
      />
    </div>
  );
}
