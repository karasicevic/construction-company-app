import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchNoteRowComponent } from './dispatch-note-row.component';

describe('DispatchNoteRowComponent', () => {
  let component: DispatchNoteRowComponent;
  let fixture: ComponentFixture<DispatchNoteRowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatchNoteRowComponent]
    });
    fixture = TestBed.createComponent(DispatchNoteRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
