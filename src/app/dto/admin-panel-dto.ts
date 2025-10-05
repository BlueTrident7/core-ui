export class AdminPanelDto {
  stats?: StatsDTO;
  users?: UserDTO[];
  settings?: SettingsDTO;
}
export class StatsDTO {
  totalUsers?: number;
  activeSessions?: number;
  totalTransactions?: number;
}
export class UserDTO {
  id?: number;
  name?: string;
  email?: string;
  role?: string;
}
export class SettingsDTO {
  notifications?: boolean;
  twoFactor?: boolean;
  theme?: string;
}
