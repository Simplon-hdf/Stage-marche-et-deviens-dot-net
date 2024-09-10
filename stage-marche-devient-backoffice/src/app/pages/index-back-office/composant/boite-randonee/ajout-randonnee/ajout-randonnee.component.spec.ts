import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutRandonneeComponent } from './ajout-randonnee.component';

describe('AjoutRandonneeComponent', () => {
  let component: AjoutRandonneeComponent;
  let fixture: ComponentFixture<AjoutRandonneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutRandonneeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutRandonneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
