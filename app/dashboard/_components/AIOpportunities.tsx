import styles from "../dashboard.module.css";
import type { OpportunitiesData } from "../_types/dashboard";
import { SectionCard } from "./SectionCard";

type Props = {
  data: OpportunitiesData;
};

export function AIOpportunities({ data }: Props) {
  return (
    <SectionCard title="AI Firsatlar" badge={data.potentialBadge} badgeTone="green">
      <div className={styles.oppList}>
        {data.items.map((item) => (
          <article key={item.id} className={styles.oppItem}>
            <div className={styles.oppIcon} style={{ background: item.iconBg }}>
              {item.icon}
            </div>
            <div>
              <div className={styles.oppTitle}>{item.title}</div>
              <div className={styles.oppSub}>{item.subtitle}</div>
            </div>
            <div className={styles.oppAmount}>
              <div className={styles.oppValue}>{item.estimatedAmount}</div>
              <div className={styles.oppLabel}>tahmini</div>
            </div>
          </article>
        ))}
      </div>
      <div className={styles.alertStrip}>{data.alertText}</div>
    </SectionCard>
  );
}
