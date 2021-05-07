import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpCacheService {
  private cachedData: any = {};
  constructor() {}
  put(url: string, response: HttpResponse<any>): void {
    this.cachedData[url] = response;
  }
  get(url: string): HttpResponse<any> | undefined {
    return this.cachedData[url];
  }
  invalidateUrl(url: string): void {
    this.cachedData[url] = undefined;
  }
  clearCache(): void {
    this.cachedData = {};
  }
}
