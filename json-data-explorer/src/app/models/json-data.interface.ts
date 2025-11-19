export interface JsonData {
  raw: string;
  parsed: any;
  isValid: boolean;
  errorMessage?: string;
  uploadedAt?: Date;
}
