import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifTagPublicationComponent } from './modif-tag-publication.component';

describe('ModifTagPublicationComponent', () => {
  let component: ModifTagPublicationComponent;
  let fixture: ComponentFixture<ModifTagPublicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifTagPublicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifTagPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
