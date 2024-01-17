import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaDetalleDialogComponent } from './entrada-detalle-dialog.component';

describe('EntradaDetalleDialogComponent', () => {
  let component: EntradaDetalleDialogComponent;
  let fixture: ComponentFixture<EntradaDetalleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntradaDetalleDialogComponent]
    });
    fixture = TestBed.createComponent(EntradaDetalleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
