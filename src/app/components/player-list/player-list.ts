import { Component, Input } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-player-list',
  standalone: false,
  templateUrl: './player-list.html',
  styleUrl: './player-list.scss',
})
export class PlayerList {

  @Input()
  players: User[] = [];

  @Input()
  revealed = false;

}