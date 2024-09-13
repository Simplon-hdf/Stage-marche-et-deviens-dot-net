import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDevisComponent } from './page-devis.component';

describe('PageDevisComponent', () => {
  let component: PageDevisComponent;
  let fixture: ComponentFixture<PageDevisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageDevisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
