import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerChangePassComponent } from './manager-change-pass.component';

describe('ManagerChangePassComponent', () => {
  let component: ManagerChangePassComponent;
  let fixture: ComponentFixture<ManagerChangePassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerChangePassComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerChangePassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
