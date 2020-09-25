import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { WorkChatPage } from './work-chat.page';

describe('WorkChatPage', () => {
  let component: WorkChatPage;
  let fixture: ComponentFixture<WorkChatPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkChatPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
