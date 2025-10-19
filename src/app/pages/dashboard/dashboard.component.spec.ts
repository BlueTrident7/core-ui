import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [ReactiveFormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render 12 month bars', () => {
    const bars = fixture.debugElement.queryAll(By.css('.bars .bar'));
    expect(bars.length).toBe(12);
  });

  it('should have transactions rows equal to data length', () => {
    const rows = fixture.debugElement.queryAll(By.css('.tx-table tbody tr'));
    expect(rows.length).toBe(component.transactions.length);
  });

  it('download button triggers CSV generation', () => {
    spyOn(component, 'onDownload').and.callThrough();
    const btn = fixture.debugElement.query(By.css('.download')).nativeElement;
    btn.click();
    expect(component.onDownload).toHaveBeenCalled();
  });
});
