/**
 *
 *
 * @class LogicError
 * @extends {Error}
 */
class LogicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export default LogicError;
