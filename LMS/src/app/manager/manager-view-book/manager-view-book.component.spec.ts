import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerViewBookComponent } from './manager-view-book.component';

describe('ManagerViewBookComponent', () => {
  let component: ManagerViewBookComponent;
  let fixture: ComponentFixture<ManagerViewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerViewBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerViewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
