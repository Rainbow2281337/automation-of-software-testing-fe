import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostButtonComponent } from './add-post-button.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AddPostButtonComponent', () => {
  let component: AddPostButtonComponent;
  let fixture: ComponentFixture<AddPostButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPostButtonComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AddPostButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
