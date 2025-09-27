import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InvestmentComponent } from './investment.component';
import { By } from '@angular/platform-browser';

describe('InvestmentComponent', () => {
  let component: InvestmentComponent;
  let fixture: ComponentFixture<InvestmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvestmentComponent], // standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentComponent);
    component = fixture.componentInstance;
    // do not call detectChanges here — tests will call it (so we can control timers in fakeAsync)
  });

  it('should create the investment component', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should render Control Panel title', () => {
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h2')?.textContent).toContain('Control Panel');
  });

  it('should display all balance cards', () => {
    fixture.detectChanges();
    const cards = fixture.debugElement.queryAll(By.css('.card'));
    expect(cards.length).toBe(component.balances.length);
  });

  it('should toggle add investment form when button clicked', () => {
    fixture.detectChanges();
    const toggleBtn = fixture.debugElement.query(By.css('.toggle-form')).nativeElement as HTMLButtonElement;
    expect(component.showForm).toBeFalse();
    toggleBtn.click();
    fixture.detectChanges();
    expect(component.showForm).toBeTrue();
  });

  it('should not allow invest with empty form', () => {
    spyOn(window, 'alert');
    component.newInvestment.amount = 0;
    component.newInvestment.paymentMode = '';
    component.addInvestment();
    expect(window.alert).toHaveBeenCalledWith('Please enter amount and select a payment mode.');
  });

  it('should allow valid investment', () => {
    spyOn(window, 'alert');
    component.newInvestment.amount = 1000;
    component.newInvestment.paymentMode = 'UPI';
    component.addInvestment();
    expect(window.alert).toHaveBeenCalledWith('Invested €1000 via UPI');
  });

  it('should auto-rotate first card slider every 5 seconds', fakeAsync(() => {
    // initialize component and timers inside fakeAsync so tick() controls setInterval
    fixture.detectChanges(); // triggers ngOnInit -> startAutoSlide
    const initial = component.currentSlide[0];
    tick(5000);
    expect(component.currentSlide[0]).toBe((initial + 1) % component.balances[0].plans.length);
    tick(5000);
    expect(component.currentSlide[0]).toBe((initial + 2) % component.balances[0].plans.length);
  }));

  it('should move slides manually when next/prev clicked (methods)', () => {
    fixture.detectChanges();
    const initial = component.currentSlide[0];
    component.nextSlide(0);
    expect(component.currentSlide[0]).toBe((initial + 1) % component.balances[0].plans.length);

    component.prevSlide(0);
    expect(component.currentSlide[0]).toBe(initial % component.balances[0].plans.length);
  });
});
