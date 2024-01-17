import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasHistorialComponent } from './salidas-historial.component';

describe('SalidasHistorialComponent', () => {
  let component: SalidasHistorialComponent;
  let fixture: ComponentFixture<SalidasHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalidasHistorialComponent]
    });
    fixture = TestBed.createComponent(SalidasHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
