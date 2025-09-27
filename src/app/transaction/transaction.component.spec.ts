import { ComponentFixture, TestBed } from '@angular/core/testing';
<<<<<<< HEAD
=======

>>>>>>> c7187ffcab21da838ae88b13fbd0c46cefa1182b
import { TransactionComponent } from './transaction.component';

describe('TransactionComponent', () => {
  let component: TransactionComponent;
  let fixture: ComponentFixture<TransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      imports: [TransactionComponent],
    }).compileComponents();
=======
      imports: [TransactionComponent]
    })
    .compileComponents();
>>>>>>> c7187ffcab21da838ae88b13fbd0c46cefa1182b

    fixture = TestBed.createComponent(TransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

<<<<<<< HEAD
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
=======
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
>>>>>>> c7187ffcab21da838ae88b13fbd0c46cefa1182b
