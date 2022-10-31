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

export interface Filter {
  page?: number;
  offset?: number;
  limit?: number;
  newLimit?: number;
}
