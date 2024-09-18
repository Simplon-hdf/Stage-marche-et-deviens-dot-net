import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutTagPublicationComponent } from './ajout-tag-publication.component';

describe('AjoutTagPublicationComponent', () => {
  let component: AjoutTagPublicationComponent;
  let fixture: ComponentFixture<AjoutTagPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutTagPublicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutTagPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
