import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cubos } from './cubos';

describe('Cubos', () => {
  let component: Cubos;
  let fixture: ComponentFixture<Cubos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cubos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cubos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
