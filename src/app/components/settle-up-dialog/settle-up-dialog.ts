import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Person {
  id: string;
  name: string;
  email: string;
  balance: number; // positive means they owe you, negative means you owe them
}

interface SettlementData {
  type: string;
  personId: string;
  amount: number;
  paymentMethod?: string;
  notes: string;
}

@Component({
  selector: 'app-settle-up-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './settle-up-dialog.html',
  styleUrl: './settle-up-dialog.scss'
})
export class SettleUpDialog implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() settlementCompleted = new EventEmitter<SettlementData>();

  // Form data
  settlementType: string = '';
  selectedPerson: string = '';
  amount: number | null = null;
  paymentMethod: string = '';
  notes: string = '';

  // Component state
  isLoading: boolean = false;
  errors: { [key: string]: string } = {};
  availablePeople: Person[] = [];

  ngOnInit(): void {
    this.loadAvailablePeople();
  }

  /**
   * Load people with outstanding balances
   */
  loadAvailablePeople(): void {
    // Mock data - in real app, this would come from a service
    this.availablePeople = [
      {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        balance: 450.75 // Sarah owes you ₹450.75
      },
      {
        id: '2',
        name: 'Mike Chen',
        email: 'mike@example.com',
        balance: -280.50 // You owe Mike ₹280.50
      },
      {
        id: '3',
        name: 'Emily Davis',
        email: 'emily@example.com',
        balance: 125.25 // Emily owes you ₹125.25
      },
      {
        id: '4',
        name: 'David Wilson',
        email: 'david@example.com',
        balance: -95.00 // You owe David ₹95.00
      },
      {
        id: '5',
        name: 'Lisa Brown',
        email: 'lisa@example.com',
        balance: 340.00 // Lisa owes you ₹340.00
      }
    ];

    // Filter out people with zero balance for cleaner display
    this.availablePeople = this.availablePeople.filter(person => person.balance !== 0);
  }

  /**
   * Get person name by ID
   */
  getPersonName(personId: string): string {
    const person = this.availablePeople.find(p => p.id === personId);
    return person ? person.name : '';
  }

  /**
   * Get payment method label
   */
  getPaymentMethodLabel(method: string): string {
    const labels: { [key: string]: string } = {
      'cash': 'Cash',
      'upi': 'UPI',
      'card': 'Card',
      'bank_transfer': 'Bank Transfer',
      'other': 'Other'
    };
    return labels[method] || method;
  }

  /**
   * Format amount for display
   */
  formatAmount(amount: number): string {
    return Math.abs(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  /**
   * Get absolute value of a number
   */
  getAbsoluteValue(value: number): number {
    return Math.abs(value);
  }

  /**
   * Validate form data
   */
  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.settlementType) {
      this.errors['settlementType'] = 'Please select a settlement type';
      isValid = false;
    }

    if (!this.selectedPerson) {
      this.errors['selectedPerson'] = 'Please select a person';
      isValid = false;
    }

    if (!this.amount || this.amount <= 0) {
      this.errors['amount'] = 'Please enter a valid amount';
      isValid = false;
    }

    if ((this.settlementType === 'pay' || this.settlementType === 'record') && !this.paymentMethod) {
      this.errors['paymentMethod'] = 'Please select a payment method';
      isValid = false;
    }

    return isValid;
  }

  /**
   * Check if form is valid
   */
  isFormValid(): boolean {
    return !!(
      this.settlementType &&
      this.selectedPerson &&
      this.amount &&
      this.amount > 0 &&
      (this.settlementType === 'request' || this.paymentMethod)
    );
  }

  /**
   * Process the settlement
   */
  processSettlement(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      const settlementData: SettlementData = {
        type: this.settlementType,
        personId: this.selectedPerson,
        amount: this.amount!,
        paymentMethod: this.paymentMethod || undefined,
        notes: this.notes
      };

      this.settlementCompleted.emit(settlementData);
      this.resetForm();
      this.isLoading = false;
    }, 1500);
  }

  /**
   * Close dialog
   */
  closeDialog(): void {
    this.close.emit();
    this.resetForm();
  }

  /**
   * Reset form data
   */
  resetForm(): void {
    this.settlementType = '';
    this.selectedPerson = '';
    this.amount = null;
    this.paymentMethod = '';
    this.notes = '';
    this.errors = {};
    this.isLoading = false;
  }

  /**
   * Handle settlement type change
   */
  onSettlementTypeChange(): void {
    // Reset person selection when changing settlement type
    this.selectedPerson = '';
    this.paymentMethod = '';
    this.errors = {};
  }

  /**
   * Handle person selection change
   */
  onPersonSelectionChange(): void {
    const person = this.availablePeople.find(p => p.id === this.selectedPerson);
    if (person && this.settlementType) {
      // Auto-suggest amount based on balance and settlement type
      if (this.settlementType === 'pay' && person.balance < 0) {
        // You owe them money
        this.amount = Math.abs(person.balance);
      } else if (this.settlementType === 'request' && person.balance > 0) {
        // They owe you money
        this.amount = person.balance;
      }
    }
    this.errors = {};
  }

  /**
   * Get suggested people based on settlement type
   */
  getSuggestedPeople(): Person[] {
    if (!this.settlementType) return this.availablePeople;

    switch (this.settlementType) {
      case 'pay':
        return this.availablePeople.filter(p => p.balance < 0); // People you owe
      case 'request':
        return this.availablePeople.filter(p => p.balance > 0); // People who owe you
      default:
        return this.availablePeople;
    }
  }
}