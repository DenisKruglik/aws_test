import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text: string;

  isNotificationVisible = false;

  notificationText: string;

  sendMessage() {
    fetch('https://0jr9lsjft6.execute-api.us-east-2.amazonaws.com/dev/addMessage/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: this.text
      })
    })
    .then(() => {
      this.showNotification('Message sent successfully');
    })
    .catch(reason => {
      console.log(reason);
      this.showNotification('Something went wrong');
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
