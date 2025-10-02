import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OfflineQueueService } from './offline-queue.service';
import { environment } from '../../../environments/environment.local';

@Injectable({
  providedIn: 'root',
})
export class NetworkSyncService {
  constructor(
    private http: HttpClient,
    private offlineQueue: OfflineQueueService
  ) {}

  syncQueue(): void {
    const queue = this.offlineQueue.getQueue();
    queue.forEach((request) => {
      this.http
        .post(
          environment.baseUrl + request.apiObject.service,
          request.apiObject.params,
          request.httpOptions
        )
        .subscribe({
          next: (result: any) => {
            console.log('Sync successful:', result);
            request.callback.onResult(
              result,
              request.requestServiceType,
              request.dataToReturn
            );
          },
          error: (err: any) => {
            console.error('Error syncing data:', err);
            request.callback.onError(
              err,
              request.requestServiceType,
              request.dataToReturn
            );
          },
          complete: () => {},
        });
    });

    // Clear the queue after syncing
    this.offlineQueue.clearQueue();
  }
}
