import { User } from "../users/User";
import { Contact } from "./Contact";

const baseURL = "http://127.0.0.1:8080";

export class ContactsAPIV1 {

  listContacts(user:User) {
    return fetch(baseURL + "/v1/contacts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + user.basicAuthToken,
      },
    }).then((response) => {
      if (response.ok) {
        return response;
      }

      const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      };

      let error = `error fetching list of contacts: ${JSON.stringify(httpErrorInfo)}`
      console.log(error);
      throw new Error(error);
    }).then((response) => {
      return response.json();
    }).catch((err) => {
      throw new Error(err);
    });
  }

  getContact(user:User, id:string) {
    return fetch(baseURL + `/v1/contacts/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + user.basicAuthToken,
      },
    }).then((response) => {
      if (response.ok) {
        return response;
      }

      const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      };

      let error = `error fetching contact ${id}: ${JSON.stringify(httpErrorInfo)}`
      console.log(error);
      throw new Error(error);
    }).then((response) => {
      return response.json();
    }).catch((err) => {
      throw new Error(err);
    });
  }

  updateContact(user:User, contact:Contact) {
    return fetch(baseURL + `/v1/contacts/${contact.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + user.basicAuthToken,
      },
      body: JSON.stringify(contact),
    }).then((response) => {
      if (response.ok) {
        return response;
      }

      const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      };

      let error = `error updating contact ${contact.id}: ${JSON.stringify(httpErrorInfo)}`
      console.log(error);
      throw new Error(error);
    }).then((response) => {
      return response.json();
    }).catch((err) => {
      throw new Error(err);
    });
  }

  createContact(user:User, contact:Contact) {
    return fetch(baseURL + `/v1/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + user.basicAuthToken,
      },
      body: JSON.stringify(contact),
    }).then((response) => {
      if (response.ok) {
        return response;
      }

      const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      };

      let error = `error creating new contact: ${JSON.stringify(httpErrorInfo)}`
      console.log(error);
      throw new Error(error);
    }).then((response) => {
      return response.json();
    }).catch((err) => {
      throw new Error(err);
    });
  }

  deleteContact(user:User, contact:Contact) {
    return fetch(baseURL + `/v1/contacts/${contact.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + user.basicAuthToken,
      },
    }).then((response) => {
      if (response.ok) {
        return;
      }

      const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      };

      let error = `error updating contact ${contact.id}: ${JSON.stringify(httpErrorInfo)}`
      console.log(error);
      throw new Error(error);
    }).catch((err) => {
      throw new Error(err);
    });
  }
}
