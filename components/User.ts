export class User {
  private id: number;
  private name: string;
  private secret: string;

  constructor(id: number, name: string, secret: string) {
    this.id = id;
    this.name = name;
    this.secret = secret;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getSecret(): string {
    return this.secret;
  }
}
