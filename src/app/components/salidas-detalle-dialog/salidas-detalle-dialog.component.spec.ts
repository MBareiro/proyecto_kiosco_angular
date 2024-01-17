import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalidasDetalleDialogComponent } from './salidas-detalle-dialog.component';

describe('SalidasDetalleDialogComponent', () => {
  let component: SalidasDetalleDialogComponent;
  let fixture: ComponentFixture<SalidasDetalleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalidasDetalleDialogComponent]
    });
    fixture = TestBed.createComponent(SalidasDetalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
