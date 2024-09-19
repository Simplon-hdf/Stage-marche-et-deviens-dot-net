import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifPublicationComponent } from './modif-publication.component';

describe('ModifPublicationComponent', () => {
  let component: ModifPublicationComponent;
  let fixture: ComponentFixture<ModifPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifPublicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
