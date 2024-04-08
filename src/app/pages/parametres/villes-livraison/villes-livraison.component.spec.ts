import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillesLivraisonComponent } from './villes-livraison.component';

describe('VillesLivraisonComponent', () => {
  let component: VillesLivraisonComponent;
  let fixture: ComponentFixture<VillesLivraisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillesLivraisonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillesLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
