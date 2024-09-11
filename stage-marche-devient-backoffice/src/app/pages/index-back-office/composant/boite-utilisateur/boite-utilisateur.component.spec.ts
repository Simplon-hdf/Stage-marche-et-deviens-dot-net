import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiteUtilisateurComponent } from './boite-utilisateur.component';

describe('BoiteUtilisateurComponent', () => {
  let component: BoiteUtilisateurComponent;
  let fixture: ComponentFixture<BoiteUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoiteUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiteUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
