export class LoginError extends Error {
  name: string;
  message: string;

  constructor(message : string) {
    super();
    this.name = 'LoginError';
    this.message =message;
  }
}