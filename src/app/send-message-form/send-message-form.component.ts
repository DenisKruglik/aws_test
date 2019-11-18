import { Component } from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-send-message-form',
  templateUrl: './send-message-form.component.html',
  styleUrls: ['./send-message-form.component.css']
})
export class SendMessageFormComponent {
  text: string;

  isNotificationVisible = false;

  notificationText: string;

  isSending = false;

  constructor(private messages: MessageService) {}

  sendMessage() {
    this.isSending = true;
    fetch('https://0jr9lsjft6.execute-api.us-east-2.amazonaws.com/dev/addMessage/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.text
      })
    })
    .then(response => {
      return response.json();
    })
    .then(result => {
      const newMessage = result[0];
      this.messages.pushMessage(newMessage);
      this.showNotification('Message sent successfully');
    })
    .catch(reason => {
      console.log(reason);
      this.showNotification('Something went wrong');
    })
    .finally(() => {
      this.isSending = false;
    });
  }

  private showNotification(notificationText) {
    this.notificationText = notificationText;
    this.isNotificationVisible = true;
    setTimeout(() => {
      this.isNotificationVisible = false;
    }, 3000);
  }
}
