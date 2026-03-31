import styles from "../dashboard.module.css";
import type { RevenueFunnelData } from "../_types/dashboard";
import { SectionCard } from "./SectionCard";

type Props = {
  data: RevenueFunnelData;
};

export function RevenueFunnel({ data }: Props) {
  return (
    <SectionCard title="Gelir Breakdown" badge={data.badge} badgeTone="purple">
      <div className={styles.funnelRow}>
        {data.items.map((item) => (
          <div key={item.id} className={styles.funnelItem}>
            <div className={styles.funnelLabel}>{item.label}</div>
            <div className={styles.funnelBarWrap}>
              <div
                className={styles.funnelBar}
                style={{ width: `${item.ratioPct}%`, background: item.color }}
              >
                %{item.ratioPct}
              </div>
            </div>
            <div className={styles.funnelAmount}>{item.amount}</div>
          </div>
        ))}
      </div>
      <div className={styles.funnelTotal}>
        <span>{data.totalLabel}</span>
        <strong>{data.totalAmount}</strong>
      </div>
    </SectionCard>
  );
}
