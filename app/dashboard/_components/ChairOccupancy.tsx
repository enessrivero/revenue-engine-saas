import styles from "../dashboard.module.css";
import type { ChairOccupancyData } from "../_types/dashboard";
import { SectionCard } from "./SectionCard";

type Props = {
  data: ChairOccupancyData;
};

export function ChairOccupancy({ data }: Props) {
  return (
    <SectionCard title="Koltuk Doluluk" badge={data.badge} badgeTone="teal">
      <div className={styles.chairGrid}>
        {data.cells.map((state, index) => (
          <div key={`${state}-${index}`} className={`${styles.chairCell} ${styles[`chair${state}`]}`}>
            {index + 1}
          </div>
        ))}
      </div>
      <div className={styles.chairLegend}>
        {data.legend.map((item) => (
          <div key={item.id} className={styles.chairLegendItem}>
            <span className={styles.chairLegendDot} style={{ background: item.color }} />
            {item.label}
          </div>
        ))}
      </div>
      <div className={styles.miniGrid}>
        {data.summary.map((item) => (
          <div key={item.id} className={styles.miniCard}>
            <div className={styles.miniLabel}>{item.label}</div>
            <div className={styles.miniValue} style={item.valueColor ? { color: item.valueColor } : undefined}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
