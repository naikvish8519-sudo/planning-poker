import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  standalone: false,
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss',
})
export class Toolbar {

  @Output()
  reveal = new EventEmitter<void>();

  @Output()
  newRound = new EventEmitter<void>();

  @Output()
  leave = new EventEmitter<void>();

}