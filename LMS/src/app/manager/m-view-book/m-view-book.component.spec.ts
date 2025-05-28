import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MViewBookComponent } from './m-view-book.component';

describe('MViewBookComponent', () => {
  let component: MViewBookComponent;
  let fixture: ComponentFixture<MViewBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MViewBookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MViewBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
