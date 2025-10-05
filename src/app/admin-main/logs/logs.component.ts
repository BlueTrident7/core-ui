import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';

interface Log {
  id: number;
  timestamp: string;
  status: string;
  requesterEmail: string;
  candidateEmail: string;
  summary: string;
  statusCode: number;
  problemDetail: string;
  companyId: string;
  country: string;
  timezone: string;
}

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, CardModule, SidebarModule],
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {
  logs: Log[] = [];
  selectedLog!: Log | null;
  detailsVisible: boolean = false;

  ngOnInit(): void {
    this.logs = [
      {
        id: 1,
        timestamp: 'January 1, 7:00:00 AM',
        status: 'Error',
        requesterEmail: 'nice.name@hackerrank.com',
        candidateEmail: 'hawkins@gmail.com',
        summary: 'Test already completed',
        statusCode: 404,
        problemDetail:
          'The Invitation did not go through because the license expired on 12/10/2022. Renew their license and try again.',
        companyId: 'HackerRank Max',
        country: 'Worldwide',
        timezone: '(GMT-8)'
      },
      {
        id: 2,
        timestamp: 'January 3, 7:00:00 AM',
        status: 'Error',
        requesterEmail: 'joey@hackerrank.com',
        candidateEmail: 'savannah@gmail.com',
        summary: 'Candidate unavailable',
        statusCode: 500,
        problemDetail: 'Server error while processing request',
        companyId: 'HackerRank Pro',
        country: 'US',
        timezone: '(GMT-5)'
      }
      // you can add more logs here
    ];
  }

  // onRowSelect(event: any) {
  //   this.detailsVisible = true;
  // }
}
