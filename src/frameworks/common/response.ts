export class Response {
   #status: boolean;
   #error: string | null;
   #content: string | null;

   constructor(status = false, error = null, content = null) {
      this.#status = status;
      this.#error = error;
      this.#content = content;
   }
}

export class ResponseError {
   #status: boolean;
   #msg: string;
   #reason: string;
   #url: string;
   #ip: string;

   constructor(status: boolean, msg: string, reason: string, url: string, ip: string) {
      this.#status = status;
      this.#msg = msg;
      this.#reason = reason;
      this.#url = url;
      this.#ip = ip;
   }
}