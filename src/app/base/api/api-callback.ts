export interface ApiCallBack {
  onResult(result: any, type: any, other?: any): void;
  onError(err: any, type: any, other?: any): void;
}
