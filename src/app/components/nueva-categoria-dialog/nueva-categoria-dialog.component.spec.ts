import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaCategoriaDialogComponent } from './nueva-categoria-dialog.component';

describe('NuevaCategoriaDialogComponent', () => {
  let component: NuevaCategoriaDialogComponent;
  let fixture: ComponentFixture<NuevaCategoriaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NuevaCategoriaDialogComponent]
    });
    fixture = TestBed.createComponent(NuevaCategoriaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
