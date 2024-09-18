import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteThemeComponent } from './boite-theme.component';

describe('BoiteThemeComponent', () => {
  let component: BoiteThemeComponent;
  let fixture: ComponentFixture<BoiteThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoiteThemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
