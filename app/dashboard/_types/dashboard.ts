export type DeltaDirection = "up" | "down" | "neutral";

export type BadgeTone = "green" | "amber" | "purple" | "red" | "teal";
export type PeriodKey = "7G" | "30G" | "90G" | "YTD";

export type KPIItem = {
  id: string;
  label: string;
  value: string;
  delta: string;
  deltaDirection: DeltaDirection;
  subtext: string;
  dotColor: string;
  isHero?: boolean;
  heroTrendPoints?: string;
};

export type AIInsight = {
  title: string;
  message: string;
  highlights: string[];
  actionLabel: string;
};

export type TopbarData = {
  title: string;
  subtitle: string;
  periods: PeriodKey[];
  defaultPeriod: PeriodKey;
  aiStatusLabel: string;
};

export type RevenueTrendData = {
  labels: string[];
  yoyBadge: string;
  series: Array<{
    id: string;
    label: string;
    color: string;
    values: number[];
  }>;
};

export type RevenueFunnelItem = {
  id: string;
  label: string;
  ratioPct: number;
  amount: string;
  color: string;
};

export type RevenueFunnelData = {
  badge: string;
  items: RevenueFunnelItem[];
  totalLabel: string;
  totalAmount: string;
};

export type ChairCellState = "filled" | "upsell" | "noshow" | "empty";

export type ChairOccupancyData = {
  badge: string;
  cells: ChairCellState[];
  legend: Array<{ id: string; label: string; color: string }>;
  summary: Array<{ id: string; label: string; value: string; valueColor?: string }>;
};

export type OpportunityItem = {
  id: string;
  icon: string;
  iconBg: string;
  title: string;
  subtitle: string;
  estimatedAmount: string;
};

export type OpportunitiesData = {
  potentialBadge: string;
  items: OpportunityItem[];
  alertText: string;
};

export type NoShowDay = {
  id: string;
  day: string;
  count: number;
  barPct: number;
};

export type NoShowData = {
  badge: string;
  noShowRate: string;
  noShowDelta: string;
  lostRevenue: string;
  lostRevenueDelta: string;
  dayLabel: string;
  days: NoShowDay[];
  aiForecast: string;
};

export type TreatmentAcceptanceData = {
  badge: string;
  acceptedPct: number;
  pendingPct: number;
  rejectedPct: number;
  legend: Array<{ id: string; label: string; pct: number; color: string }>;
  miniStats: Array<{ id: string; label: string; value: string; valueColor?: string }>;
};

export type PatientRow = {
  id: string;
  name: string;
  meta: string;
  ltv: string;
  ltvTierColor: string;
  aov: string;
  status: string;
  statusTone: "confirmed" | "risk" | "pending" | "opportunity";
  opportunity: string;
  opportunityTone: "confirmed" | "risk" | "pending" | "opportunity";
};

export type PatientLTVTableData = {
  badge: string;
  columns: string[];
  rows: PatientRow[];
};

export type NavSection = {
  id: string;
  label: string;
  items: Array<{ id: string; label: string; href: string; active?: boolean }>;
};

export type SidebarData = {
  logoPrimary: string;
  logoAccent: string;
  logoSub: string;
  sections: NavSection[];
  clinicName: string;
  clinicPlan: string;
  clinicInitials: string;
};

export type DashboardData = {
  topbar: TopbarData;
  sidebar: SidebarData;
  insight: AIInsight;
  chairOccupancy: ChairOccupancyData;
  opportunities: OpportunitiesData;
  patientTable: PatientLTVTableData;
  periodSnapshots: Record<
    PeriodKey,
    {
      kpis: KPIItem[];
      revenueTrend: RevenueTrendData;
      revenueFunnel: RevenueFunnelData;
      noShow: NoShowData;
      treatmentAcceptance: TreatmentAcceptanceData;
    }
  >;
};
