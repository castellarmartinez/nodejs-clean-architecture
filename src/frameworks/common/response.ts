type SuccessInput = {
  status: boolean;
  error?: ErrorResponse | null;
  content: unknown;
};

type ErrorInput = {
  status: number;
  msg: string;
  url: string;
  ip: string;
  validationErrors?: ValidationError[];
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
  url: string;
  ip: string;
  validationErrors: ValidationError[];

  constructor({
    status,
    msg,
    url,
    ip,
    validationErrors = [],
  }: ErrorInput) {
    this.status = status;
    this.msg = msg;
    this.url = url;
    this.ip = ip;
    this.validationErrors = validationErrors;
  }
}

export class ValidationError extends Error {
  field: string;
  msg: string;

  constructor({ field, msg }: { field: string; msg: string }) {
    super(msg);
    this.field = field;
    this.msg = msg;
  }
}
