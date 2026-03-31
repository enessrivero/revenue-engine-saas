import styles from "../dashboard.module.css";
import type { BadgeTone } from "../_types/dashboard";

type Props = {
  title: string;
  badge?: string;
  badgeTone?: BadgeTone;
  children: React.ReactNode;
};

export function SectionCard({ title, badge, badgeTone = "purple", children }: Props) {
  return (
    <section className={styles.card}>
      <header className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {badge ? (
          <span className={`${styles.cardBadge} ${styles[`badge${badgeTone}`]}`}>{badge}</span>
        ) : null}
      </header>
      <div className={styles.cardBody}>{children}</div>
    </section>
  );
}
