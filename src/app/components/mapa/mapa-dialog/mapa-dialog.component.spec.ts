import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaDialogComponent } from './mapa-dialog.component';

describe('MapaDialogComponent', () => {
  let component: MapaDialogComponent;
  let fixture: ComponentFixture<MapaDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapaDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
