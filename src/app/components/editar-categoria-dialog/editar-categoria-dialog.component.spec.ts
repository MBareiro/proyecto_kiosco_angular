import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCategoriaDialogComponent } from './editar-categoria-dialog.component';

describe('EditarCategoriaDialogComponent', () => {
  let component: EditarCategoriaDialogComponent;
  let fixture: ComponentFixture<EditarCategoriaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarCategoriaDialogComponent]
    });
    fixture = TestBed.createComponent(EditarCategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
