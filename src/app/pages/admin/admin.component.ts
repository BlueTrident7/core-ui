import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

interface Plan {
  id: number;
  name: string;
  amount: number;
  duration: string;
  returnRate: number;
  description: string;
  status: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  type: string;
}

interface Log {
  id: number;
  user: string;
  action: string;
  timestamp: string;
  details: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, TabViewModule, TableModule, CardModule, ButtonModule, TooltipModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  activeIndex: number = 0;

  // Mock data for Overview cards
  stats = [
    { title: 'Total Plans', value: 40, icon: 'pi pi-chart-line' },
    { title: 'Active Categories', value: 12, icon: 'pi pi-tags' },
    { title: 'Total Logs', value: 500, icon: 'pi pi-history' },
    { title: 'System Users', value: 150, icon: 'pi pi-users' }
  ];

  // Mock data for Investment Plan (>15 plans)
  investmentPlans: Plan[] = [
    { id: 1, name: 'Daily Starter', amount: 100, duration: 'Daily', returnRate: 0.5, description: 'Low risk daily investment plan', status: 'Active' },
    { id: 2, name: 'Daily Growth', amount: 500, duration: 'Daily', returnRate: 1.2, description: 'Moderate growth daily', status: 'Active' },
    { id: 3, name: 'Daily Premium', amount: 1000, duration: 'Daily', returnRate: 2.0, description: 'High return daily plan', status: 'Active' },
    { id: 4, name: 'Daily Elite', amount: 1500, duration: 'Daily', returnRate: 3.5, description: 'Elite daily returns', status: 'Pending' },
    { id: 5, name: 'Daily Ultimate', amount: 2000, duration: 'Daily', returnRate: 5.0, description: 'Ultimate daily plan', status: 'Active' },
    { id: 6, name: 'Daily Pro', amount: 800, duration: 'Daily', returnRate: 2.8, description: 'Professional daily growth', status: 'Active' },
    { id: 7, name: 'Daily Advanced', amount: 1200, duration: 'Daily', returnRate: 4.0, description: 'Advanced daily investment', status: 'Active' },
    { id: 8, name: 'Daily Standard', amount: 600, duration: 'Daily', returnRate: 1.8, description: 'Standard daily plan', status: 'Inactive' },
    { id: 9, name: 'Daily Basic', amount: 200, duration: 'Daily', returnRate: 0.8, description: 'Basic daily investment', status: 'Active' },
    { id: 10, name: 'Daily Platinum', amount: 2500, duration: 'Daily', returnRate: 6.0, description: 'Platinum daily premium', status: 'Active' },
    { id: 11, name: 'Weekly Basic', amount: 200, duration: 'Weekly', returnRate: 3.0, description: 'Basic weekly investment', status: 'Active' },
    { id: 12, name: 'Weekly Pro', amount: 800, duration: 'Weekly', returnRate: 5.5, description: 'Professional weekly growth', status: 'Pending' },
    { id: 13, name: 'Weekly Elite', amount: 1500, duration: 'Weekly', returnRate: 8.0, description: 'Elite weekly returns', status: 'Active' },
    { id: 14, name: 'Weekly Standard', amount: 500, duration: 'Weekly', returnRate: 4.2, description: 'Standard weekly plan', status: 'Active' },
    { id: 15, name: 'Weekly Advanced', amount: 1200, duration: 'Weekly', returnRate: 7.0, description: 'Advanced weekly investment', status: 'Inactive' },
    { id: 16, name: 'Weekly Premium', amount: 1800, duration: 'Weekly', returnRate: 9.5, description: 'Premium weekly returns', status: 'Active' },
    { id: 17, name: 'Monthly Standard', amount: 500, duration: 'Monthly', returnRate: 6.0, description: 'Standard monthly plan', status: 'Active' },
    { id: 18, name: 'Monthly Advanced', amount: 1200, duration: 'Monthly', returnRate: 10.0, description: 'Advanced monthly investment', status: 'Active' },
    { id: 19, name: 'Monthly Ultimate', amount: 2500, duration: 'Monthly', returnRate: 15.0, description: 'Ultimate monthly returns', status: 'Pending' },
    { id: 20, name: 'Monthly Basic', amount: 300, duration: 'Monthly', returnRate: 4.5, description: 'Basic monthly investment', status: 'Active' }
  ];

  // Mock data for Category (>15 categories)
  categories: Category[] = [
    { id: 1, name: 'Stocks', description: 'Equity investments', type: 'Investment' },
    { id: 2, name: 'Bonds', description: 'Fixed income securities', type: 'Investment' },
    { id: 3, name: 'Mutual Funds', description: 'Pooled investment funds', type: 'Investment' },
    { id: 4, name: 'ETFs', description: 'Exchange traded funds', type: 'Investment' },
    { id: 5, name: 'Real Estate', description: 'Property investments', type: 'Investment' },
    { id: 6, name: 'Commodities', description: 'Gold, oil, etc.', type: 'Investment' },
    { id: 7, name: 'Cryptocurrency', description: 'Digital assets', type: 'Investment' },
    { id: 8, name: 'Forex', description: 'Currency trading', type: 'Trading' },
    { id: 9, name: 'Options', description: 'Derivative contracts', type: 'Trading' },
    { id: 10, name: 'Futures', description: 'Commodity futures', type: 'Trading' },
    { id: 11, name: 'Savings', description: 'High yield savings', type: 'Savings' },
    { id: 12, name: 'CDs', description: 'Certificates of deposit', type: 'Savings' },
    { id: 13, name: 'Retirement', description: '401k, IRA plans', type: 'Retirement' },
    { id: 14, name: 'Education', description: '529 plans', type: 'Education' },
    { id: 15, name: 'Emergency Fund', description: 'Liquid savings', type: 'Emergency' },
    { id: 16, name: 'Travel', description: 'Vacation funds', type: 'Personal' },
    { id: 17, name: 'Home Improvement', description: 'Renovation budget', type: 'Personal' },
    { id: 18, name: 'Debt Repayment', description: 'Loan payoff', type: 'Debt' },
    { id: 19, name: 'Charity', description: 'Donation funds', type: 'Charity' },
    { id: 20, name: 'Business', description: 'Startup capital', type: 'Business' }
  ];

  // Mock data for Logs (>15 logs)
  logs: Log[] = [
    { id: 1, user: 'Admin User', action: 'Login', timestamp: '2023-10-01 10:00', details: 'Successful login from IP 192.168.1.1' },
    { id: 2, user: 'John Doe', action: 'Investment Created', timestamp: '2023-10-01 09:30', details: 'New daily plan added' },
    { id: 3, user: 'Jane Smith', action: 'Category Updated', timestamp: '2023-10-01 11:15', details: 'Stocks category description changed' },
    { id: 4, user: 'System', action: 'Backup Completed', timestamp: '2023-10-01 08:45', details: 'Daily database backup successful' },
    { id: 5, user: 'Bob Johnson', action: 'User Role Changed', timestamp: '2023-10-01 12:00', details: 'Role updated to Moderator' },
    { id: 6, user: 'Alice Brown', action: 'Logout', timestamp: '2023-10-01 10:30', details: 'Session ended normally' },
    { id: 7, user: 'Charlie Wilson', action: 'Plan Approved', timestamp: '2023-10-01 09:00', details: 'Weekly plan status set to Active' },
    { id: 8, user: 'Diana Evans', action: 'Error', timestamp: '2023-10-01 11:45', details: 'Failed to update category due to validation error' },
    { id: 9, user: 'Eve Davis', action: 'Investment Deleted', timestamp: '2023-10-01 07:30', details: 'Inactive plan removed' },
    { id: 10, user: 'Frank Miller', action: 'Login Failed', timestamp: '2023-10-01 10:15', details: 'Invalid credentials from IP 192.168.1.10' },
    { id: 11, user: 'Grace Lee', action: 'Category Created', timestamp: '2023-10-01 12:30', details: 'New Cryptocurrency category added' },
    { id: 12, user: 'Henry Garcia', action: 'Plan Edited', timestamp: '2023-10-01 08:00', details: 'Return rate updated for Monthly Standard' },
    { id: 13, user: 'Ivy Martinez', action: 'System Alert', timestamp: '2023-10-01 11:00', details: 'High server load detected' },
    { id: 14, user: 'Jack Rodriguez', action: 'Logout', timestamp: '2023-10-01 09:45', details: 'Forced logout due to inactivity' },
    { id: 15, user: 'Kara Lopez', action: 'Backup Failed', timestamp: '2023-10-01 10:45', details: 'Disk space insufficient for backup' },
    { id: 16, user: 'Leo Hernandez', action: 'User Registered', timestamp: '2023-10-01 12:15', details: 'New user account created' },
    { id: 17, user: 'Mia Gonzalez', action: 'Plan Status Changed', timestamp: '2023-10-01 07:15', details: 'Set to Pending for review' },
    { id: 18, user: 'Noah Perez', action: 'Category Deleted', timestamp: '2023-10-01 11:30', details: 'Old category removed' },
    { id: 19, user: 'Olivia Sanchez', action: 'Login', timestamp: '2023-10-01 08:30', details: 'Successful admin login' },
    { id: 20, user: 'Paul Ramirez', action: 'Error', timestamp: '2023-10-01 09:15', details: 'Database connection timeout' }
  ];

  onTabChange(event: any) {
    this.activeIndex = event.index;
  }
}
