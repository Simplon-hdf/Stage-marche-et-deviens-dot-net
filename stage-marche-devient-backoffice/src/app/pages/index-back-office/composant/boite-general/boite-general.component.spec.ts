import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteGeneralComponent } from './boite-general.component';

describe('BoiteGeneralComponent', () => {
  let component: BoiteGeneralComponent;
  let fixture: ComponentFixture<BoiteGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoiteGeneralComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
