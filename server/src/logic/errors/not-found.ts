import LogicError from "./logic";

/**
 *
 *
 * @class NotFoundError
 * @extends {LogicError}
 */
class NotFoundError extends LogicError {
  constructor(message: string = "not found") {
    super(message);
  }
}

export default NotFoundError;
