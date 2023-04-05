import { errorMessages } from "./error.mes.js";

export class ErrorInterceptor {
  static defaultInterceptor(err, req, errorCode) {
    function chooseMessage() {
      const messages = Object.values(errorMessages);
      let messagesCheck;
      messages.forEach((el) => {
        if (messages.includes(err.message)) {
          messagesCheck = err.message;
        } else {
          messagesCheck = errorMessages.defaultMessage;
        }
      });
      return messagesCheck;
    }
    const errorText = chooseMessage();
    return {
      reqId: req.uuidv4,
      message: errorText,
      fact: err.fact || errorMessages.factMessage,
    };
  }
}
