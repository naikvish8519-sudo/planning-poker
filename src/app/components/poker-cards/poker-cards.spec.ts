import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerCards } from './poker-cards';

describe('PokerCards', () => {
  let component: PokerCards;
  let fixture: ComponentFixture<PokerCards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PokerCards],
    }).compileComponents();

    fixture = TestBed.createComponent(PokerCards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
