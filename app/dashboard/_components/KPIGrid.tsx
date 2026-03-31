import styles from "../dashboard.module.css";
import type { KPIItem } from "../_types/dashboard";
import { KPICard } from "./KPICard";

type Props = {
  items: KPIItem[];
};

export function KPIGrid({ items }: Props) {
  return (
    <section className={styles.kpiGrid}>
      {items.map((item) => (
        <KPICard key={item.id} item={item} />
      ))}
    </section>
  );
}
