import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularCoreComponent } from './angular-core.component';

describe('AngularCoreComponent', () => {
  let component: AngularCoreComponent;
  let fixture: ComponentFixture<AngularCoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularCoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
