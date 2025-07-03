import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atualizar } from './atualizar';

describe('Atualizar', () => {
  let component: Atualizar;
  let fixture: ComponentFixture<Atualizar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atualizar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Atualizar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
