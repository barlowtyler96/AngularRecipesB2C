import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourSharesComponent } from './your-shares.component';

describe('YourSharesComponent', () => {
  let component: YourSharesComponent;
  let fixture: ComponentFixture<YourSharesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YourSharesComponent]
    });
    fixture = TestBed.createComponent(YourSharesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
