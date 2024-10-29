import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableTestComponent } from './datatable-test.component';

describe('DatatableTestComponent', () => {
  let component: DatatableTestComponent;
  let fixture: ComponentFixture<DatatableTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatatableTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatatableTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
