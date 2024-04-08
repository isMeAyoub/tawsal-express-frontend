import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillesRamassageComponent } from './villes-ramassage.component';

describe('VillesRamassageComponent', () => {
  let component: VillesRamassageComponent;
  let fixture: ComponentFixture<VillesRamassageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VillesRamassageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VillesRamassageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
