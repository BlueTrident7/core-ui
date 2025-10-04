import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoAccessComponent } from './no-access.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NoAccessComponent', () => {
  let component: NoAccessComponent;
  let fixture: ComponentFixture<NoAccessComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoAccessComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(NoAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render heading text', () => {
    const h1 = compiled.querySelector('h1');
    expect(h1?.textContent).toContain('You don’t have access');
  });

  it('should have two action buttons', () => {
    const buttons = compiled.querySelectorAll('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });
});
