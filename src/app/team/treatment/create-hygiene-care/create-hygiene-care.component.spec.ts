import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CreateHygieneCareComponent } from './create-hygiene-care.component';

describe('CreateHygieneCareComponent', () => {
  let component: CreateHygieneCareComponent;
  let fixture: ComponentFixture<CreateHygieneCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateHygieneCareComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateHygieneCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
