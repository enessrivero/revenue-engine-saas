import styles from "../dashboard.module.css";
import type { NoShowData } from "../_types/dashboard";
import { SectionCard } from "./SectionCard";

type Props = {
  data: NoShowData;
};

export function NoShowAnalysis({ data }: Props) {
  return (
    <SectionCard title="No-show ve Iptal" badge={data.badge} badgeTone="amber">
      <div className={styles.miniGridTwo}>
        <div className={styles.miniCard}>
          <div className={styles.miniLabel}>No-show Orani</div>
          <div className={styles.miniValue} style={{ color: "var(--red)" }}>
            {data.noShowRate}
          </div>
          <div className={styles.miniDelta}>azalis: {data.noShowDelta}</div>
        </div>
        <div className={styles.miniCard}>
          <div className={styles.miniLabel}>Kayip Gelir</div>
          <div className={styles.miniValue} style={{ color: "var(--amber)" }}>
            {data.lostRevenue}
          </div>
          <div className={styles.miniDelta}>azalis: {data.lostRevenueDelta}</div>
        </div>
      </div>

      <div className={styles.dayLabel}>{data.dayLabel}</div>
      {data.days.map((day) => (
        <div key={day.id} className={styles.nsRow}>
          <div className={styles.nsDay}>{day.day}</div>
          <div className={styles.nsBarWrap}>
            <div className={styles.nsBar} style={{ width: `${day.barPct}%` }} />
          </div>
          <div className={styles.nsVal}>{day.count}</div>
        </div>
      ))}
      <div className={styles.aiForecast}>{data.aiForecast}</div>
    </SectionCard>
  );
}
