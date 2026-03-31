"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArcElement,
  Chart as ChartJS,
  DoughnutController,
  Legend,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import styles from "../dashboard.module.css";
import type { TreatmentAcceptanceData } from "../_types/dashboard";
import { SectionCard } from "./SectionCard";

ChartJS.register(DoughnutController, ArcElement, Tooltip, Legend);

type Props = {
  data: TreatmentAcceptanceData;
};

export function TreatmentAcceptance({ data }: Props) {
  const [uiColors, setUiColors] = useState({
    text: "#1a1d23",
    muted: "#8a8f9e",
  });

  useEffect(() => {
    const root = document.documentElement;
    const computed = getComputedStyle(root);
    const text = computed.getPropertyValue("--text").trim() || uiColors.text;
    const muted = computed.getPropertyValue("--muted").trim() || uiColors.muted;
    setUiColors({ text, muted });
  }, []);

  const chartData = useMemo<ChartData<"doughnut">>(
    () => ({
      labels: data.legend.map((item) => item.label),
      datasets: [
        {
          data: [data.acceptedPct, data.pendingPct, data.rejectedPct],
          backgroundColor: data.legend.map((item) => item.color),
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    }),
    [data],
  );

  const options = useMemo<ChartOptions<"doughnut">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "72%",
      animation: { duration: 500, easing: "easeOutQuart" },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label}: %${ctx.raw}`,
          },
        },
      },
    }),
    [],
  );

  return (
    <SectionCard title="Tedavi Kabul Orani" badge={data.badge} badgeTone="green">
      <div className={styles.donutWrap}>
        <div className={styles.donutRing}>
          <Doughnut data={chartData} options={options} />
          <div className={styles.donutInner} style={{ color: uiColors.text }}>
            <div className={styles.ringValue}>%{data.acceptedPct}</div>
            <div className={styles.ringLabel} style={{ color: uiColors.muted }}>
              kabul
            </div>
          </div>
        </div>
        <div className={styles.donutLegend}>
          {data.legend.map((item) => (
            <div key={item.id} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: item.color }} />
              <span className={styles.legendName}>{item.label}</span>
              <span className={styles.legendPct}>%{item.pct}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.miniGridTwo}>
        {data.miniStats.map((stat) => (
          <div key={stat.id} className={styles.miniCard}>
            <div className={styles.miniLabel}>{stat.label}</div>
            <div className={styles.miniValue} style={stat.valueColor ? { color: stat.valueColor } : undefined}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
