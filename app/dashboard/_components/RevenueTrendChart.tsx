"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import styles from "../dashboard.module.css";
import type { RevenueTrendData } from "../_types/dashboard";
import { SectionCard } from "./SectionCard";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

type Props = {
  data: RevenueTrendData;
};

export function RevenueTrendChart({ data }: Props) {
  const [uiColors, setUiColors] = useState({
    muted: "#8a8f9e",
    text: "#1a1d23",
    grid: "rgba(0,0,0,0.05)",
    tooltipBg: "#ffffff",
    tooltipBorder: "rgba(0,0,0,0.1)",
  });

  useEffect(() => {
    const root = document.documentElement;
    const computed = getComputedStyle(root);
    const muted = computed.getPropertyValue("--muted").trim() || uiColors.muted;
    const text = computed.getPropertyValue("--text").trim() || uiColors.text;

    setUiColors({
      muted,
      text,
      grid: "rgba(0,0,0,0.05)",
      tooltipBg: "#ffffff",
      tooltipBorder: "rgba(0,0,0,0.1)",
    });
  }, []);

  const chartData = useMemo<ChartData<"bar">>(
    () => ({
      labels: data.labels,
      datasets: data.series.map((series) => ({
        label: series.label,
        data: series.values,
        backgroundColor: series.color,
        borderRadius: 4,
        stack: "revenue",
      })),
    }),
    [data],
  );

  const options = useMemo<ChartOptions<"bar">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: { duration: 500, easing: "easeOutQuart" },
      plugins: {
        legend: {
          position: "top",
          align: "start",
          labels: {
            color: uiColors.muted,
            boxWidth: 10,
            boxHeight: 10,
            borderRadius: 2,
            font: { size: 10 },
          },
        },
        tooltip: {
          backgroundColor: uiColors.tooltipBg,
          borderColor: uiColors.tooltipBorder,
          borderWidth: 1,
          titleColor: uiColors.text,
          bodyColor: uiColors.muted,
          callbacks: {
            label: (ctx) => ` ${ctx.dataset.label}: ₺${ctx.raw}k`,
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: { display: false },
          ticks: { color: uiColors.muted, font: { size: 10 } },
        },
        y: {
          stacked: true,
          beginAtZero: true,
          grid: { color: uiColors.grid },
          ticks: {
            color: uiColors.muted,
            font: { size: 10 },
            callback: (value) => `₺${value}k`,
          },
        },
      },
    }),
    [uiColors],
  );

  return (
    <SectionCard title="Gelir Trendi" badge={data.yoyBadge} badgeTone="green">
      <div style={{ height: 240 }}>
        <Bar data={chartData} options={options} />
      </div>
    </SectionCard>
  );
}
