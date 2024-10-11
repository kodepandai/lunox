class Counter {
  protected count = 0;
  increment(step: number = 1) {
    this.count += step;
  }
  decrement(step: number = 1) {
    this.count -= step;
  }
  getCount() {
    return this.count;
  }
}
export default Counter;
