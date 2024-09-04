import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteRandoneeComponent } from './boite-randonee.component';

describe('BoiteRandoneeComponent', () => {
  let component: BoiteRandoneeComponent;
  let fixture: ComponentFixture<BoiteRandoneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoiteRandoneeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteRandoneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
