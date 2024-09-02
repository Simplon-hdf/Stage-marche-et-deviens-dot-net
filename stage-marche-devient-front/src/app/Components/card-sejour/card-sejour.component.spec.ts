import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSejourComponent } from './card-sejour.component';

describe('CardSejourComponent', () => {
  let component: CardSejourComponent;
  let fixture: ComponentFixture<CardSejourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSejourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSejourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
