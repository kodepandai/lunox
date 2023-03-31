class MissingAppKeyException extends Error {
  constructor(message = "No application encryption key has been specified.") {
    super(message);
  }
}
export default MissingAppKeyException;
