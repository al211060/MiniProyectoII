import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoItemsComponent } from './listado-items.component';

describe('ListadoItemsComponent', () => {
  let component: ListadoItemsComponent;
  let fixture: ComponentFixture<ListadoItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoItemsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
