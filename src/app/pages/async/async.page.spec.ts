import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsyncPage } from './async.page';

describe('AsyncPage', () => {
  let component: AsyncPage;
  let fixture: ComponentFixture<AsyncPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AsyncPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
