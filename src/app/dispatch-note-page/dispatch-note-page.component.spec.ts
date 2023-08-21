import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispatchNotePageComponent } from './dispatch-note-page.component';

describe('DispatchNotePageComponent', () => {
  let component: DispatchNotePageComponent;
  let fixture: ComponentFixture<DispatchNotePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispatchNotePageComponent]
    });
    fixture = TestBed.createComponent(DispatchNotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
