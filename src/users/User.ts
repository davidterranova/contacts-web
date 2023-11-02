import { UUID } from "crypto";

export class User {
  id: UUID | undefined;
  username: string = '';
  password: string = '';

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.username) this.username = initializer.username;
    if (initializer.password) this.password = initializer.password;
  }

  get basicAuthToken(): string {
    if (this.username === '' || this.password === '') {
      throw new Error("Username and password must be set to generate basic auth token");
    }

    return encode(this.username + ":" + this.password)
  }

  get isAuthenticated():boolean {
    return this.username !== '';
  }
}

// const decode = (str: string):string => Buffer.from(str, 'base64').toString('binary');
const encode = (str: string):string => btoa(str);
