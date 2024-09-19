import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoitePublicationComponent } from './boite-publication.component';

describe('BoitePublicationComponent', () => {
  let component: BoitePublicationComponent;
  let fixture: ComponentFixture<BoitePublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoitePublicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoitePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
