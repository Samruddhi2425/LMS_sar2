import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MUpdateBookComponent } from './m-update-book.component';

describe('MUpdateBookComponent', () => {
  let component: MUpdateBookComponent;
  let fixture: ComponentFixture<MUpdateBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MUpdateBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MUpdateBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
