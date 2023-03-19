import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingChatComponent } from './marketing-chat.component';

describe('MarketingChatComponent', () => {
  let component: MarketingChatComponent;
  let fixture: ComponentFixture<MarketingChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
