import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BlankNotePage } from './blank-note.page';

describe('BlankNotePage', () => {
  let component: BlankNotePage;
  let fixture: ComponentFixture<BlankNotePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankNotePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BlankNotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
