import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Group {
  id: string;
  name: string;
  memberCount: number;
  icon?: string;
}

interface Member {
  id: string;
  name: string;
  email: string;
  isCurrentUser: boolean;
}

interface Category {
  value: string;
  label: string;
  icon: string;
}

interface SplitMethod {
  value: string;
  title: string;
  description: string;
  icon: string;
}

interface MemberSplit {
  memberId: string;
  amount: number;
  percentage: number;
}

interface ExpenseData {
  description: string;
  amount: number;
  category: string;
  groupId: string;
  date: string;
  paidBy: string;
  splitMethod: string;
  notes: string;
}

@Component({
  selector: 'app-add-expense-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-expense-dialog.html',
  styleUrl: './add-expense-dialog.scss'
})
export class AddExpenseDialog implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() availableGroups: Group[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() expenseAdded = new EventEmitter<any>();

  isLoading = false;
  maxDate: string = '';
  groupMembers: Member[] = [];
  memberSplits: MemberSplit[] = [];

  expenseData: ExpenseData = {
    description: '',
    amount: 0,
    category: '',
    groupId: '',
    date: '',
    paidBy: '',
    splitMethod: 'equal',
    notes: ''
  };

  categories: Category[] = [
    { value: 'food', label: 'Food & Dining', icon: '🍽️' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { value: 'groceries', label: 'Groceries', icon: '🛒' },
    { value: 'transport', label: 'Transportation', icon: '🚗' },
    { value: 'utilities', label: 'Utilities', icon: '💡' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'health', label: 'Healthcare', icon: '⚕️' },
    { value: 'education', label: 'Education', icon: '📚' },
    { value: 'travel', label: 'Travel', icon: '✈️' },
    { value: 'rent', label: 'Rent & Housing', icon: '🏠' },
    { value: 'other', label: 'Other', icon: '💰' }
  ];

  splitMethods: SplitMethod[] = [
    {
      value: 'equal',
      title: 'Split Equally',
      description: 'Split the amount equally among all members',
      icon: '⚖️'
    },
    {
      value: 'percentage',
      title: 'Split by Percentage',
      description: 'Split based on custom percentages',
      icon: '📊'
    },
    {
      value: 'exact',
      title: 'Split by Exact Amounts',
      description: 'Enter exact amounts for each person',
      icon: '💯'
    }
  ];

  ngOnInit(): void {
    // Set default date to today
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
    this.expenseData.date = this.maxDate;

    // Load mock groups if none provided
    if (this.availableGroups.length === 0) {
      this.loadMockGroups();
    }
  }

  loadMockGroups(): void {
    this.availableGroups = [
      {
        id: '1',
        name: 'College Friends',
        memberCount: 6,
        icon: '🎓'
      },
      {
        id: '2',
        name: 'Roommates',
        memberCount: 4,
        icon: '🏠'
      },
      {
        id: '3',
        name: 'Weekend Squad',
        memberCount: 5,
        icon: '🎉'
      },
      {
        id: '4',
        name: 'Office Team',
        memberCount: 8,
        icon: '💼'
      }
    ];
  }

  onGroupChange(): void {
    this.loadGroupMembers();
    this.expenseData.paidBy = ''; // Reset paid by when group changes
  }

  loadGroupMembers(): void {
    // Mock group members - in real app, this would come from a service
    const mockMembers: { [key: string]: Member[] } = {
      '1': [
        { id: 'user1', name: 'You', email: 'you@example.com', isCurrentUser: true },
        { id: 'user2', name: 'Sarah Johnson', email: 'sarah@example.com', isCurrentUser: false },
        { id: 'user3', name: 'Mike Chen', email: 'mike@example.com', isCurrentUser: false },
        { id: 'user4', name: 'Emma Davis', email: 'emma@example.com', isCurrentUser: false },
        { id: 'user5', name: 'Alex Kumar', email: 'alex@example.com', isCurrentUser: false },
        { id: 'user6', name: 'Lisa Wong', email: 'lisa@example.com', isCurrentUser: false }
      ],
      '2': [
        { id: 'user1', name: 'You', email: 'you@example.com', isCurrentUser: true },
        { id: 'user7', name: 'David Wilson', email: 'david@example.com', isCurrentUser: false },
        { id: 'user8', name: 'Maria Garcia', email: 'maria@example.com', isCurrentUser: false },
        { id: 'user9', name: 'James Brown', email: 'james@example.com', isCurrentUser: false }
      ],
      '3': [
        { id: 'user1', name: 'You', email: 'you@example.com', isCurrentUser: true },
        { id: 'user2', name: 'Sarah Johnson', email: 'sarah@example.com', isCurrentUser: false },
        { id: 'user10', name: 'Tom Anderson', email: 'tom@example.com', isCurrentUser: false },
        { id: 'user11', name: 'Rachel Green', email: 'rachel@example.com', isCurrentUser: false },
        { id: 'user12', name: 'Chris Lee', email: 'chris@example.com', isCurrentUser: false }
      ],
      '4': [
        { id: 'user1', name: 'You', email: 'you@example.com', isCurrentUser: true },
        { id: 'user13', name: 'Jennifer Taylor', email: 'jennifer@example.com', isCurrentUser: false },
        { id: 'user14', name: 'Robert Johnson', email: 'robert@example.com', isCurrentUser: false },
        { id: 'user15', name: 'Amanda Smith', email: 'amanda@example.com', isCurrentUser: false },
        { id: 'user16', name: 'Kevin Zhang', email: 'kevin@example.com', isCurrentUser: false },
        { id: 'user17', name: 'Nicole Davis', email: 'nicole@example.com', isCurrentUser: false },
        { id: 'user18', name: 'Daniel Kim', email: 'daniel@example.com', isCurrentUser: false },
        { id: 'user19', name: 'Sophia Martinez', email: 'sophia@example.com', isCurrentUser: false }
      ]
    };

    this.groupMembers = mockMembers[this.expenseData.groupId] || [];
    this.initializeMemberSplits();
  }

  initializeMemberSplits(): void {
    this.memberSplits = this.groupMembers.map(member => ({
      memberId: member.id,
      amount: 0,
      percentage: 0
    }));

    // Set equal percentages if percentage split
    if (this.expenseData.splitMethod === 'percentage') {
      const equalPercentage = Math.round(100 / this.groupMembers.length);
      this.memberSplits.forEach((split, index) => {
        split.percentage = index === 0 ? 100 - (equalPercentage * (this.groupMembers.length - 1)) : equalPercentage;
      });
    }
  }

  onSplitMethodChange(): void {
    this.initializeMemberSplits();
  }

  updatePercentageSplits(): void {
    const totalAmount = this.expenseData.amount || 0;
    this.memberSplits.forEach(split => {
      split.amount = (totalAmount * split.percentage) / 100;
    });
  }

  updateExactSplits(): void {
    // Update percentages based on exact amounts
    const totalAmount = this.expenseData.amount || 0;
    if (totalAmount > 0) {
      this.memberSplits.forEach(split => {
        split.percentage = (split.amount / totalAmount) * 100;
      });
    }
  }

  getEqualSplit(): number {
    const totalAmount = this.expenseData.amount || 0;
    return this.groupMembers.length > 0 ? totalAmount / this.groupMembers.length : 0;
  }

  getTotalAllocated(): number {
    return this.memberSplits.reduce((total, split) => total + split.amount, 0);
  }

  isSplitValid(): boolean {
    if (this.expenseData.splitMethod === 'equal') {
      return true;
    }

    const totalAmount = this.expenseData.amount || 0;
    const allocated = this.getTotalAllocated();
    return Math.abs(totalAmount - allocated) < 0.01; // Allow for rounding differences
  }

  formatAmount(amount: number): string {
    return Math.abs(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  onOverlayClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeDialog();
    }
  }

  onSubmit(): void {
    if (!this.isSplitValid()) {
      return;
    }

    this.isLoading = true;

    // Prepare expense data
    const expensePayload = {
      ...this.expenseData,
      memberSplits: this.memberSplits.map(split => ({
        memberId: split.memberId,
        amount: this.expenseData.splitMethod === 'equal' ? this.getEqualSplit() : split.amount
      })),
      createdAt: new Date().toISOString(),
      id: this.generateId()
    };

    // Simulate API call
    setTimeout(() => {
      console.log('Adding expense:', expensePayload);
      this.expenseAdded.emit(expensePayload);
      this.isLoading = false;
      this.resetForm();
      this.close.emit();
    }, 1500);
  }

  closeDialog(): void {
    this.close.emit();
  }

  resetForm(): void {
    this.expenseData = {
      description: '',
      amount: 0,
      category: '',
      groupId: '',
      date: this.maxDate,
      paidBy: '',
      splitMethod: 'equal',
      notes: ''
    };
    this.groupMembers = [];
    this.memberSplits = [];
  }

  generateId(): string {
    return 'expense_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
}