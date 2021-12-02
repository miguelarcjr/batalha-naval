import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuadroBatalhaComponent } from './quadro-batalha.component';

describe('QuadroBatalhaComponent', () => {
  let component: QuadroBatalhaComponent;
  let fixture: ComponentFixture<QuadroBatalhaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuadroBatalhaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuadroBatalhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
