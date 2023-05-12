export interface HttpExceptionInterface {
  getStatusCode(): number;
  getHeaders(): Record<string, string>;
  getPrevious(): Error | null;
}
