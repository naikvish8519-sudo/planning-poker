import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteTable } from './vote-table';

describe('VoteTable', () => {
  let component: VoteTable;
  let fixture: ComponentFixture<VoteTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoteTable],
    }).compileComponents();

    fixture = TestBed.createComponent(VoteTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
