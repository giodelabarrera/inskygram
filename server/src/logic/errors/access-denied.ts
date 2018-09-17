import LogicError from "./logic";

/**
 *
 *
 * @class AccessDeniedError
 * @extends {LogicError}
 */
class AccessDeniedError extends LogicError {
  constructor(message: string = "access denied") {
    super(message);
  }
}

export default AccessDeniedError;
