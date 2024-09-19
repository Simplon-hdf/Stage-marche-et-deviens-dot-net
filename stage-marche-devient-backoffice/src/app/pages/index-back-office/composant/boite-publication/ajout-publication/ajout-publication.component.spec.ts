import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutPublicationComponent } from './ajout-publication.component';

describe('AjoutPublicationComponent', () => {
  let component: AjoutPublicationComponent;
  let fixture: ComponentFixture<AjoutPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutPublicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
