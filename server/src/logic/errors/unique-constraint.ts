import LogicError from "./logic";

/**
 *
 *
 * @class UniqueConstraintError
 * @extends {LogicError}
 */
class UniqueConstraintError extends LogicError {
  constructor(message: string = "unique constraint error") {
    super(message);
  }
}

export default UniqueConstraintError;
