"use client";

import { useState } from "react";
import styles from "../dashboard.module.css";
import type { DashboardData } from "../_types/dashboard";
import { AIInsightBanner } from "./AIInsightBanner";
import { AIOpportunities } from "./AIOpportunities";
import { ChairOccupancy } from "./ChairOccupancy";
import { DashboardShell } from "./DashboardShell";
import { KPIGrid } from "./KPIGrid";
import { NoShowAnalysis } from "./NoShowAnalysis";
import { PatientLTVTable } from "./PatientLTVTable";
import { RevenueFunnel } from "./RevenueFunnel";
import { RevenueTrendChart } from "./RevenueTrendChart";
import { SidebarNav } from "./SidebarNav";
import { Topbar } from "./Topbar";
import { TreatmentAcceptance } from "./TreatmentAcceptance";

type Props = {
  data: DashboardData;
};

export function DashboardClient({ data }: Props) {
  const [activePeriod, setActivePeriod] = useState(data.topbar.defaultPeriod);
  const snapshot = data.periodSnapshots[activePeriod];

  return (
    <DashboardShell
      sidebar={<SidebarNav data={data.sidebar} />}
      topbar={
        <Topbar
          data={data.topbar}
          activePeriod={activePeriod}
          onPeriodChange={setActivePeriod}
        />
      }
    >
      <AIInsightBanner data={data.insight} />
      <KPIGrid items={snapshot.kpis} />

      <section className={styles.rowThreeTwo}>
        <RevenueTrendChart data={snapshot.revenueTrend} />
        <RevenueFunnel data={snapshot.revenueFunnel} />
      </section>

      <section className={styles.rowEqual}>
        <ChairOccupancy data={data.chairOccupancy} />
        <AIOpportunities data={data.opportunities} />
        <NoShowAnalysis data={snapshot.noShow} />
      </section>

      <section className={styles.rowTwoThree}>
        <TreatmentAcceptance data={snapshot.treatmentAcceptance} />
        <PatientLTVTable data={data.patientTable} />
      </section>
    </DashboardShell>
  );
}
