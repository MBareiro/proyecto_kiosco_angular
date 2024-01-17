import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoProductoDialogComponent } from './nuevo-producto-dialog.component';

describe('NuevoProductoDialogComponent', () => {
  let component: NuevoProductoDialogComponent;
  let fixture: ComponentFixture<NuevoProductoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevoProductoDialogComponent]
    });
    fixture = TestBed.createComponent(NuevoProductoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
