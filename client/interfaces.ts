export interface ResponseData {
  error: boolean;
  data: {
    token: string;
  }
}

export interface ErrorData {
  error: boolean;
  data: {
    message: [{
      value: string;
      msg: string;
      param: string;
      localtion: string;
    }];
  }
}