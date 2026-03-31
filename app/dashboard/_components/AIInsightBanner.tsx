import styles from "../dashboard.module.css";
import type { AIInsight } from "../_types/dashboard";

type Props = {
  data: AIInsight;
};

export function AIInsightBanner({ data }: Props) {
  return (
    <section className={styles.aiBanner}>
      <div className={styles.aiIcon}>AI</div>
      <div className={styles.aiText}>
        <strong>{data.title}:</strong> {data.message}
        <div className={styles.aiHighlights}>{data.highlights.join(" · ")}</div>
      </div>
      <button type="button" className={styles.aiAction}>
        {data.actionLabel}
      </button>
    </section>
  );
}
