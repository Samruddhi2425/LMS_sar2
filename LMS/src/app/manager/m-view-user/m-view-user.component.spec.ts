import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MViewUserComponent } from './m-view-user.component';

describe('MViewUserComponent', () => {
  let component: MViewUserComponent;
  let fixture: ComponentFixture<MViewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MViewUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
