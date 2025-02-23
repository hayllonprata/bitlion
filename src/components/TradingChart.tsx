import React, { useEffect, useRef } from 'react';
import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';

interface TradingChartProps {
  data: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
}

export function TradingChart({ data }: TradingChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<any>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#000000' },
        textColor: '#D9D9D9',
      },
      grid: {
        vertLines: { color: '#1E1E1E' },
        horzLines: { color: '#1E1E1E' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: '#555555',
          width: 1,
          style: 3,
        },
        horzLine: {
          color: '#555555',
          width: 1,
          style: 3,
        },
      },
      rightPriceScale: {
        borderColor: '#1E1E1E',
      },
      timeScale: {
        borderColor: '#1E1E1E',
        timeVisible: true,
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
      },
      handleScale: {
        axisPressedMouseMove: true,
        mouseWheel: true,
        pinch: true,
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#00B596',
      downColor: '#D1425E',
      borderVisible: false,
      wickUpColor: '#00B596',
      wickDownColor: '#D1425E',
    });

    candlestickSeries.setData(data);

    // Fit the chart content
    chart.timeScale().fitContent();

    // Store chart instance for cleanup
    chartRef.current = chart;

    // Handle container resizing
    const resizeObserver = new ResizeObserver(() => {
      if (chartContainerRef.current) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        });
      }
    });

    resizeObserver.observe(chartContainerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [data]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
}