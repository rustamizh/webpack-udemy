export default class Calc {
  add(...args) {
    args.reduce((a, b) => a + b, 0);
  }
}
