class Recaller {
  protected recaller: string;

  constructor(recaller: string) {
    this.recaller = recaller;
  }

  /**
   * Determine if the recaller is valid.
   */
  public valid() {
    return this.properString() && this.hasAllSegments();
  }

  /**
   * Determine if the recaller is an valid string.
   */
  protected properString() {
    return typeof this.recaller == "string" && this.recaller.includes("|");
  }

  /**
   * Determine if the recaller has all segments.
   */
  protected hasAllSegments() {
    const segments = this.recaller.split("|");
    return (
      segments.length == 3 &&
      segments[0].trim() !== "" &&
      segments[1].trim() !== ""
    );
  }

  /**
   * Get the user ID from the recaller
   */
  public id() {
    return this.recaller.split("|", 3)[0];
  }

  /**
   * Get the "remember token" from the recaller
   */
  public token() {
    return this.recaller.split("|", 3)[1];
  }
}

export default Recaller;
