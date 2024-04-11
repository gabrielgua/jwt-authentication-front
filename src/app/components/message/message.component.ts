import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export type MessageClass = 'success' | 'info' | 'warning' | 'error'; 
export type MessageType = 'title-with-icon' | 'title-only' | 'icon-only' | 'message-only'; 

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {

  @Input() class: MessageClass = 'success';
  @Input() type: MessageType = 'title-with-icon';
  @Input() closeable: boolean = true;
  @Input() text: string = '';

  @Input() show: boolean = false;

  constructor() {}

  onShow() {
    this.show = true;
    console.log('opened: ', this.show);
    
  }

  close() {
    this.show = false;
  }

  getTitle(): string {
    switch(this.class) {
      case('success'): { return 'Success' } break;
      case('error'): { return 'Error' } break;
      case('warning'): { return 'Warning' } break;
      case('info'): { return 'Info' } break;
    }
  }

  getDefaultMessage(): string {
    switch(this.class) {
      case('success'): { return 'The action you tried to do was successful.' } break;
      case('error'): { return 'An error has occurred, try again later.' } break;
      case('warning'): { return 'This action may contain irreversable consequences.' } break;
      case('info'): { return 'This message contains very important info.' } break;
    }
  }

 
}
