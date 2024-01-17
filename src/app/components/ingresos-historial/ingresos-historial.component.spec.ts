import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosHistorialComponent } from './ingresos-historial.component';

describe('IngresosHistorialComponent', () => {
  let component: IngresosHistorialComponent;
  let fixture: ComponentFixture<IngresosHistorialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresosHistorialComponent]
    });
    fixture = TestBed.createComponent(IngresosHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
