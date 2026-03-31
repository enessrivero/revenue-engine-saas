import styles from "../dashboard.module.css";
import type { PeriodKey, TopbarData } from "../_types/dashboard";

type Props = {
  data: TopbarData;
  activePeriod: PeriodKey;
  onPeriodChange: (period: PeriodKey) => void;
};

export function Topbar({ data, activePeriod, onPeriodChange }: Props) {
  return (
    <header className={styles.topbar}>
      <div>
        <div className={styles.topbarTitle}>{data.title}</div>
        <div className={styles.topbarSubtitle}>{data.subtitle}</div>
      </div>
      <div className={styles.topbarRight}>
        <div className={styles.periodSelector}>
          {data.periods.map((period) => (
            <button
              key={period}
              type="button"
              onClick={() => onPeriodChange(period)}
              className={`${styles.periodButton} ${
                period === activePeriod ? styles.periodButtonActive : ""
              }`}
            >
              {period}
            </button>
          ))}
        </div>
        <div className={styles.aiPulse}>
          <span className={styles.pulseDot} />
          {data.aiStatusLabel}
        </div>
      </div>
    </header>
  );
}
