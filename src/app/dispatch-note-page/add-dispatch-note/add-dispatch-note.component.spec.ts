import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDispatchNoteComponent } from './add-dispatch-note.component';

describe('AddDispatchNoteComponent', () => {
  let component: AddDispatchNoteComponent;
  let fixture: ComponentFixture<AddDispatchNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDispatchNoteComponent]
    });
    fixture = TestBed.createComponent(AddDispatchNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
