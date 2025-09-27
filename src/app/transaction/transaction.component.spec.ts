import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionComponent } from './transaction.component';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the transaction component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the transaction table with correct number of rows', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('tbody tr');
    expect(rows.length).toBe(component.transactions.length);
  });

  it('should highlight negative amounts with class "negative"', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const negativeCells = compiled.querySelectorAll('td.amount.negative');
    expect(negativeCells.length).toBeGreaterThan(0);
  });
});