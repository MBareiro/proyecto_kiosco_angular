import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCategoriaDialogComponent } from './crear-categoria-dialog.component';

describe('CrearCategoriaDialogComponent', () => {
  let component: CrearCategoriaDialogComponent;
  let fixture: ComponentFixture<CrearCategoriaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearCategoriaDialogComponent]
    });
    fixture = TestBed.createComponent(CrearCategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
