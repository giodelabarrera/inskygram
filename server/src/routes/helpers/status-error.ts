import { LogicError, NotFoundError, UniqueConstraintError, AccessDeniedError } from "../../logic/errors";

const statusError = (err: Error) => {
  let status = 500;
  if (err instanceof LogicError) { status = 400; }
  if (err instanceof AccessDeniedError) { status = 403; }
  if (err instanceof NotFoundError) { status = 404; }
  if (err instanceof UniqueConstraintError) { status = 409; }

  return status;
};

export default statusError;
