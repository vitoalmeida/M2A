export interface GenericData {
  id: number;
  value: string;
  label: string;
}

export interface ErrorType {
  response: {
    status: number;
    details: { [key: string]: any };
    data: { [key: string]: any };
  };
}
