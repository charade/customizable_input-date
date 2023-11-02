import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomOverlayComponent } from './custom-overlay.component';

describe('CustomOverlayComponent', () => {
  let component: CustomOverlayComponent;
  let fixture: ComponentFixture<CustomOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CustomOverlayComponent]
    });
    fixture = TestBed.createComponent(CustomOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
