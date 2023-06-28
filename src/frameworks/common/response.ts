type SuccessInput = {
  status: boolean;
  error?: ErrorResponse | null;
  content: unknown;
};

type ErrorInput = {
  status: number;
  msg: string;
  reason: string;
  url: string;
  ip: string;
};


export class HttpException extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}

export class SuccessResponse {
  status: boolean;
  error: ErrorResponse | null;
  content: unknown;

  constructor({ error = null, status = false, content = null }: SuccessInput) {
    this.status = status;
    this.error = error;
    this.content = content;
  }
}

export class ErrorResponse {
  status: number;
  msg: string;
  reason: string;
  url: string;
  ip: string;

  constructor({ status, msg, reason, url, ip }: ErrorInput) {
    this.status = status;
    this.msg = msg;
    this.reason = reason;
    this.url = url;
    this.ip = ip;
  }
}
