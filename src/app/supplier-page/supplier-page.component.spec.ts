import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierPageComponent } from './supplier-page.component';

describe('SupplierPageComponent', () => {
  let component: SupplierPageComponent;
  let fixture: ComponentFixture<SupplierPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierPageComponent]
    });
    fixture = TestBed.createComponent(SupplierPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
