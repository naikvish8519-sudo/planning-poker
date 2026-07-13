import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-poker-cards',
  standalone: false,
  templateUrl: './poker-cards.html',
  styleUrl: './poker-cards.scss',
})
export class PokerCards {

  cards = [1, 2, 3, 5, 8, 13, 21];

  selectedCard: number | null = null;

  @Output()
  voteSelected = new EventEmitter<number>();

  selectCard(card: number) {

    this.selectedCard = card;

    this.voteSelected.emit(card);

  }

}