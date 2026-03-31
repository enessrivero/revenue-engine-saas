import styles from "../dashboard.module.css";
import type { PatientLTVTableData } from "../_types/dashboard";
import { SectionCard } from "./SectionCard";

type Props = {
  data: PatientLTVTableData;
};

export function PatientLTVTable({ data }: Props) {
  return (
    <SectionCard title="Hasta LTV ve Firsatlar" badge={data.badge} badgeTone="purple">
      <table className={styles.aptTable}>
        <thead>
          <tr>
            {data.columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row) => (
            <tr key={row.id}>
              <td>
                <div className={styles.patientName}>{row.name}</div>
                <div className={styles.patientMeta}>{row.meta}</div>
              </td>
              <td>
                <div className={styles.ltvBadge}>
                  <span className={styles.ltvTier} style={{ background: row.ltvTierColor }} />
                  {row.ltv}
                </div>
              </td>
              <td className={styles.aovValue}>{row.aov}</td>
              <td>
                <span className={`${styles.statusPill} ${styles[`status${row.statusTone}`]}`}>
                  {row.status}
                </span>
              </td>
              <td>
                <span className={`${styles.statusPill} ${styles[`status${row.opportunityTone}`]}`}>
                  {row.opportunity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SectionCard>
  );
}
