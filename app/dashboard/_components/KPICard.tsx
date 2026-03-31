import styles from "../dashboard.module.css";
import type { KPIItem } from "../_types/dashboard";

type Props = {
  item: KPIItem;
};

export function KPICard({ item }: Props) {
  return (
    <article className={`${styles.kpiCard} ${item.isHero ? styles.kpiHero : ""}`}>
      <div className={styles.kpiLabel}>
        <span className={styles.kpiDot} style={{ background: item.dotColor }} />
        {item.label}
      </div>
      <div className={styles.kpiValue}>{item.value}</div>
      <div className={`${styles.kpiDelta} ${styles[`delta${item.deltaDirection}`]}`}>{item.delta}</div>
      <div className={styles.kpiSub}>{item.subtext}</div>
      {item.isHero && item.heroTrendPoints ? (
        <svg className={styles.sparkline} viewBox="0 0 100 50" preserveAspectRatio="none">
          <polyline points={item.heroTrendPoints} fill="none" stroke="rgba(37,99,235,0.5)" strokeWidth="1.5" />
        </svg>
      ) : null}
    </article>
  );
}
