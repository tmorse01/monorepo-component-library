import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController,
  PieController,
  DoughnutController,
} from "chart.js";

// Register Chart.js components AND controllers (adds significant bundle size)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController,
  PieController,
  DoughnutController
);

export interface ChartProps {
  type?: "line" | "bar" | "pie" | "doughnut";
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string;
      borderWidth?: number;
    }[];
  };
  title?: string;
  height?: number;
}

/**
 * Chart Component - VERY HEAVY (~200KB!)
 *
 * A chart component using Chart.js library.
 * This component is intentionally heavy to demonstrate the impact
 * of tree-shaking. When NOT imported, the entire Chart.js library
 * (~200KB) should be excluded from the bundle.
 *
 * This is the perfect example of why selective imports matter!
 */
export function Chart({
  type = "line",
  data,
  title,
  height = 300,
}: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy previous chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    chartRef.current = new ChartJS(ctx, {
      type: type,
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
          title: {
            display: !!title,
            text: title,
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [type, data, title]);

  return (
    <div style={{ width: "100%", height: `${height}px` }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

// Metadata for bundle analysis
export const CHART_VERSION = "1.0.0";
export const CHART_METADATA = {
  name: "Chart",
  size: "very-heavy",
  category: "data-visualization",
  estimatedSize: "~200KB",
  dependencies: ["chart.js"],
  note: "This component adds Chart.js to your bundle. Only import if you need charts!",
};
