import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteTagPublicationComponent } from './boite-tag-publication.component';

describe('BoiteTagPublicationComponent', () => {
  let component: BoiteTagPublicationComponent;
  let fixture: ComponentFixture<BoiteTagPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoiteTagPublicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteTagPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
