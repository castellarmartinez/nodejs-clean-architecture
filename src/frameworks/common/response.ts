type SuccessInput = {
  status: boolean;
  error?: string | null;
  content: unknown;
};

export class SuccessResponse {
  #status: boolean;
  #error: string | null;
  #content: unknown;

  constructor({ status = false, error = null, content = null }: SuccessInput) {
    this.#status = status;
    this.#error = error;
    this.#content = content;
  }
}

export class ErrorResponse {
  #status: boolean;
  #msg: string;
  #reason: string;
  #url: string;
  #ip: string;

  constructor(
    status: boolean,
    msg: string,
    reason: string,
    url: string,
    ip: string
  ) {
    this.#status = status;
    this.#msg = msg;
    this.#reason = reason;
    this.#url = url;
    this.#ip = ip;
  }
}
