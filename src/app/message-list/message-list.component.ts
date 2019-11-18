import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  constructor(private messages: MessageService) { }

  ngOnInit() {
    this.messages.refresh();
  }

  isLoading() {
    return this.messages.checkLoading();
  }

  getMessages() {
    return this.messages.getMessages();
  }
}
