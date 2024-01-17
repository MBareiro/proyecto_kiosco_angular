import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosTopComponent } from './productos-top.component';

describe('ProductosTopComponent', () => {
  let component: ProductosTopComponent;
  let fixture: ComponentFixture<ProductosTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosTopComponent]
    });
    fixture = TestBed.createComponent(ProductosTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
