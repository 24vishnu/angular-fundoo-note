import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesOfLabelComponent } from './notes-of-label.component';

describe('NotesOfLabelComponent', () => {
  let component: NotesOfLabelComponent;
  let fixture: ComponentFixture<NotesOfLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesOfLabelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesOfLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
