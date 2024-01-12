import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProveedorDialogComponent } from './nuevo-proveedor-dialog.component';

describe('NuevoProveedorDialogComponent', () => {
  let component: NuevoProveedorDialogComponent;
  let fixture: ComponentFixture<NuevoProveedorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoProveedorDialogComponent]
    });
    fixture = TestBed.createComponent(NuevoProveedorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
