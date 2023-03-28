export class ErrorInterceptor {
  static defaultInterceptor(err, req, errorCode) {
    return {
      reqId: req.uuidv4,
      message: err.message,
      fact: err.fact || "Nothing special today.",
    };
  }
}
