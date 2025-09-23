export class ApiCallHelper {
  baseUrl!: string;
  service!: string;
  method!: string;
  id!: string;
  params!: any;
  formData!: FormData;
  message?: any;
  messageType?: MessageType;
}
export enum MessageType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  INFO = 'INFO',
}
