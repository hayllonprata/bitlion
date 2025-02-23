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
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        requestAnimationFrame(() => {
          chartRef.current.applyOptions({
            width: chartContainerRef.current!.clientWidth,
            height: chartContainerRef.current!.clientHeight,
          });
        });
      }
    };

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
    chart.timeScale().fitContent();
    chartRef.current = chart;

    // Throttled resize observer
    resizeObserverRef.current = new ResizeObserver(() => {
      window.requestAnimationFrame(handleResize);
    });

    resizeObserverRef.current.observe(chartContainerRef.current);

    // Handle window resize as well
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [data]);

  return (
    <div 
      ref={chartContainerRef} 
      className="w-full h-full"
      style={{ minHeight: '300px' }} // Ensure minimum height for the chart
    />
  );
}