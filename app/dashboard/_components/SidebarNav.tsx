import Link from "next/link";
import styles from "../dashboard.module.css";
import type { SidebarData } from "../_types/dashboard";

type Props = {
  data: SidebarData;
};

export function SidebarNav({ data }: Props) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoMark}>
          {data.logoPrimary}
          <span>{data.logoAccent}</span>
        </div>
        <div className={styles.logoSub}>{data.logoSub}</div>
      </div>

      {data.sections.map((section) => (
        <div key={section.id} className={styles.navSection}>
          <div className={styles.navLabel}>{section.label}</div>
          {section.items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`${styles.navItem} ${item.active ? styles.navItemActive : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      ))}

      <div className={styles.sidebarFooter}>
        <div className={styles.clinicBadge}>
          <div className={styles.clinicAvatar}>{data.clinicInitials}</div>
          <div>
            <div className={styles.clinicName}>{data.clinicName}</div>
            <div className={styles.clinicPlan}>{data.clinicPlan}</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
