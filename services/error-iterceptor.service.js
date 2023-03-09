export default class ErrorInterceptor {
  static defaultInterceptor(err, req, errorCode) {
    return {
      reqId: req.uuidv4,
      message: "Something went wrong. Please check your request and try again",
      fact: err.fact || "Nothing special today.",
    };
  }
}
