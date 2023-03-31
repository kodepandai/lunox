export interface Rule {
  name: string;
  passes: (args: string[] | undefined, value: any) => Promise<boolean>;
  message?: string;
}
