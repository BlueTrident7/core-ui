import { HostListener, Injectable } from '@angular/core';
import { NetworkSyncService } from './network-sync.service';

@Injectable({
    providedIn: 'root',
})
export class NetworkService {
    isOnline = navigator.onLine;

    constructor(private syncService: NetworkSyncService) {}

    addNetworkStatusEvent() {
        window.addEventListener('online', this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);
    }

    updateOnlineStatus() {
        this.isOnline = navigator.onLine;

        if (this.isOnline) {
            this.syncService.syncQueue();
        }
    }
}
