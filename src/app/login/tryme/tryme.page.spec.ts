import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrymePage } from './tryme.page';

describe('TrymePage', () => {
  let component: TrymePage;
  let fixture: ComponentFixture<TrymePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrymePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrymePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
