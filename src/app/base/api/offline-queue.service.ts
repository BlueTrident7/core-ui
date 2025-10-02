import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class OfflineQueueService {
  private queue: any[] = [];

  constructor() {}

  addToQueue(request: any): void {
    this.queue.push(request);
  }

  getQueue(): any[] {
    return this.queue;
  }

  clearQueue(): void {
    this.queue = [];
  }
}
