export interface Rule {
  name: string;
  passes: (args: string[] | undefined, value: any) => Promise<boolean>;
  message?: string;
}

export interface ValidatorContract {
  validate(inputs?: Record<string, any>): Promise<boolean>;
  fails(): Promise<boolean>;
  niceNames(customAttributes: Record<string, any>): ValidatorContract;
  messages(): Record<string, any>;
}
