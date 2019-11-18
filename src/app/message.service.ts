import { Injectable } from '@angular/core';

interface Message {
  id: number;
  text: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private static isLoading = false;

  private static messages: Message[] = [];

  constructor() {
  }

  refresh() {
    MessageService.isLoading = true;
    fetch('https://0jr9lsjft6.execute-api.us-east-2.amazonaws.com/dev/messages/', {method: 'GET'})
      .then(response => {
        return response.json();
      })
      .then(results => {
        MessageService.messages = results;
      })
      .catch(err => {
        console.log('Something went wrong during messages fetching', err);
      })
      .finally(() => {
        MessageService.isLoading = false;
      });
  }

  getMessages() {
    return MessageService.messages;
  }

  checkLoading() {
    return MessageService.isLoading;
  }

  pushMessage(message: Message) {
    MessageService.messages.push(message);
  }
}
