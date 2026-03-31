import styles from "../dashboard.module.css";

type Props = {
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  children: React.ReactNode;
};

export function DashboardShell({ sidebar, topbar, children }: Props) {
  return (
    <div className={styles.dashboardRoot}>
      {sidebar}
      <main className={styles.main}>
        {topbar}
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}
