import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllNotesPage } from './all-notes.page';

describe('AllNotesPage', () => {
  let component: AllNotesPage;
  let fixture: ComponentFixture<AllNotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllNotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
