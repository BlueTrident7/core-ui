export interface AdminPanelDto {
  totalUsers: number;
  totalInvestments: number;
  totalTransactions: number;
  totalRevenue: number;
  stats: {
    totalUsers: number;
    activeSessions: number;
    totalTransactions: number;
  };
  users: any[];
}
