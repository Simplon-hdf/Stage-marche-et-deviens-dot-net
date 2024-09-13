import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSessionComponent } from './ajout-session.component';

describe('AjoutSessionComponent', () => {
  let component: AjoutSessionComponent;
  let fixture: ComponentFixture<AjoutSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutSessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
