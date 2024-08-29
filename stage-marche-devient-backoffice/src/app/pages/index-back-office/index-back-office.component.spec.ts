import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexBackOfficeComponent } from './index-back-office.component';

describe('IndexBackOfficeComponent', () => {
  let component: IndexBackOfficeComponent;
  let fixture: ComponentFixture<IndexBackOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexBackOfficeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexBackOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
