import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexFrontPageComponent } from './index-front-page.component';

describe('IndexFrontPageComponent', () => {
  let component: IndexFrontPageComponent;
  let fixture: ComponentFixture<IndexFrontPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexFrontPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexFrontPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
