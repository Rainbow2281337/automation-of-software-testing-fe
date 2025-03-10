import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostButtonComponent } from './add-post-button.component';

describe('AddPostButtonComponent', () => {
  let component: AddPostButtonComponent;
  let fixture: ComponentFixture<AddPostButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPostButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPostButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
