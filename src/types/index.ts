export interface GenericData {
  id: number;
  label: string;
  optional: string;
}

export interface ErrorType {
  response: {
    status: number;
    details: { [key: string]: any };
    data: { [key: string]: any };
  };
}
