import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifRandonneeComponent } from './modif-randonnee.component';

describe('ModifRandonneeComponent', () => {
  let component: ModifRandonneeComponent;
  let fixture: ComponentFixture<ModifRandonneeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifRandonneeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifRandonneeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
