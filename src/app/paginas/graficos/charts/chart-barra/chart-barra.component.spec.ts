import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartBarraComponent } from './chart-barra.component';

describe('ChartBarraComponent', () => {
  let component: ChartBarraComponent;
  let fixture: ComponentFixture<ChartBarraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartBarraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartBarraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
