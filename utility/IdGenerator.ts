export class IdGenerator {
  public static usedCodes: Set<number> = new Set();

  public static get(): number {
    let code;

    do {
      code = Math.floor(1000 + Math.random() * 9000);
    } while (this.usedCodes.has(code));

    this.usedCodes.add(code);
    return code;
  }
}
