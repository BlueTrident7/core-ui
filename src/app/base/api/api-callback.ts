export interface ApiCallBack<T> {
  onSuccess?: (data: T) => void;
  onError?: (err: any, type: any, other?: any) => void;
  onComplete?: () => void;
  onResult?: (result: any, type: any, other?: any) => void;
}
