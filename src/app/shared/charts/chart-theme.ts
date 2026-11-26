import type { EChartsOption } from 'echarts';

/** Chart colours mirroring the SCSS tokens in styles/_variables.scss. */
export const chartColors = {
  primary: '#ccccf0',
  secondary: '#a1a6f5',
  info: '#70a9a1',
  text: '#e8e7ef',
  muted: '#9d9bab',
  faint: '#6f6d7c',
  grid: 'rgba(255, 255, 255, 0.06)',
  tooltipBg: '#22212a',
  tooltipBorder: 'rgba(255, 255, 255, 0.14)',
};

const axisLabel = { color: chartColors.faint, fontSize: 11, fontFamily: 'Inter Variable, Inter, sans-serif' };

/** Vertical gradient from the given colour (top) to transparent (bottom), for area fills. */
export function areaGradient(color: string, opacity = 0.28) {
  const rgb = color.startsWith('#')
    ? [1, 3, 5].map((i) => parseInt(color.slice(i, i + 2), 16)).join(', ')
    : color;
  return {
    type: 'linear' as const,
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: `rgba(${rgb}, ${opacity})` },
      { offset: 1, color: `rgba(${rgb}, 0)` },
    ],
  };
}

/** Options shared by all time-series charts: transparent background, subtle grid, themed tooltip. */
export function baseTimeSeriesOptions(): EChartsOption {
  return {
    backgroundColor: 'transparent',
    textStyle: { fontFamily: 'Inter Variable, Inter, sans-serif' },
    grid: { top: 16, right: 8, bottom: 4, left: 8, containLabel: true },
    xAxis: {
      type: 'time',
      axisLine: { lineStyle: { color: chartColors.grid } },
      axisTick: { show: false },
      axisLabel: { ...axisLabel, hideOverlap: true },
      splitLine: { show: false },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: chartColors.tooltipBg,
      borderColor: chartColors.tooltipBorder,
      borderWidth: 1,
      padding: [8, 12],
      textStyle: { color: chartColors.text, fontSize: 12 },
      extraCssText: 'border-radius: 10px; box-shadow: 0 8px 24px rgba(0,0,0,.4);',
      axisPointer: { type: 'line', lineStyle: { color: chartColors.tooltipBorder } },
    },
    animationDuration: 600,
    animationEasing: 'cubicOut',
  };
}

/** A value axis with themed labels; `splitLines` draws faint horizontal guides. */
export function valueAxis(formatter: string, splitLines = true) {
  return {
    type: 'value' as const,
    scale: true,
    axisLabel: { ...axisLabel, formatter },
    splitLine: { show: splitLines, lineStyle: { color: chartColors.grid } },
  };
}
