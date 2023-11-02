import { UUID } from "crypto";

export class Contact {
  id: UUID | undefined;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  phone: string = '';
  updated_at: Date = new Date();
  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: any) {  
    // console.log("new contact model: " + initializer);
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.first_name) this.first_name = initializer.first_name;
    if (initializer.last_name) this.last_name = initializer.last_name;
    if (initializer.email) this.email = initializer.email;
    if (initializer.phone) this.phone = initializer.phone;
    if (initializer.updated_at) this.updated_at = initializer.updated_at;
  }  
}
