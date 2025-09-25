import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
  groupId: string;
  groupName: string;
  paidBy: string;
  paidById: string;
  yourShare: number;
  participants?: string[];
  settlementStatus: 'pending' | 'settled' | 'partially_settled';
  createdAt: Date;
  updatedAt: Date;
}

interface Group {
  id: string;
  name: string;
  icon: string;
}

interface MonthGroup {
  month: string;
  total: number;
  expenses: Expense[];
}

type DateFilter = 'all' | 'today' | 'week' | 'month' | 'quarter';
type CategoryFilter = 'all' | 'food' | 'entertainment' | 'transport' | 'groceries' | 'utilities' | 'other';
type SortBy = 'date' | 'amount' | 'name' | 'group';

@Component({
  selector: 'app-expenses',
  imports: [CommonModule, FormsModule],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss'
})
export class Expenses implements OnInit {

  // Component state
  expenses: Expense[] = [];
  filteredExpenses: Expense[] = [];
  groupedExpenses: MonthGroup[] = [];
  selectedExpense: Expense | null = null;
  availableGroups: Group[] = [];

  // Search and filter state
  searchTerm: string = '';
  dateFilter: DateFilter = 'all';
  categoryFilter: CategoryFilter = 'all';
  groupFilter: string = 'all';
  sortBy: SortBy = 'date';

  // Dropdown states
  isDateFilterOpen: boolean = false;
  isCategoryFilterOpen: boolean = false;
  isGroupFilterOpen: boolean = false;
  isSortFilterOpen: boolean = false;

  // Statistics
  totalExpenses: number = 0;
  yourTotalShare: number = 0;
  netBalance: number = 0;
  totalExpenseCount: number = 0;

  ngOnInit(): void {
    this.loadExpenses();
    this.loadGroups();
    this.calculateStats();
    this.applyFiltersAndSort();
  }

  /**
   * Load expenses data - in real app, this would come from a service
   */
  loadExpenses(): void {
    // Mock expenses data
    this.expenses = [
      {
        id: '1',
        description: 'Dinner at Italian Restaurant',
        amount: 2400,
        category: 'food',
        date: new Date('2025-09-23'),
        groupId: '1',
        groupName: 'College Friends',
        paidBy: 'You',
        paidById: 'current-user',
        yourShare: 600,
        participants: ['user1', 'user2', 'user3', 'current-user'],
        settlementStatus: 'pending',
        createdAt: new Date('2025-09-23'),
        updatedAt: new Date('2025-09-23')
      },
      {
        id: '2',
        description: 'Movie Tickets for Avengers',
        amount: 800,
        category: 'entertainment',
        date: new Date('2025-09-22'),
        groupId: '2',
        groupName: 'Weekend Squad',
        paidBy: 'Sarah Wilson',
        paidById: 'user4',
        yourShare: -200,
        participants: ['user4', 'user5', 'user6', 'current-user'],
        settlementStatus: 'settled',
        createdAt: new Date('2025-09-22'),
        updatedAt: new Date('2025-09-22')
      },
      {
        id: '3',
        description: 'Weekly Grocery Shopping',
        amount: 1500,
        category: 'groceries',
        date: new Date('2025-09-21'),
        groupId: '3',
        groupName: 'Roommates',
        paidBy: 'You',
        paidById: 'current-user',
        yourShare: 375,
        participants: ['user7', 'user8', 'user9', 'current-user'],
        settlementStatus: 'partially_settled',
        createdAt: new Date('2025-09-21'),
        updatedAt: new Date('2025-09-21')
      },
      {
        id: '4',
        description: 'Uber Ride to Airport',
        amount: 320,
        category: 'transport',
        date: new Date('2025-09-20'),
        groupId: '4',
        groupName: 'Office Team',
        paidBy: 'Mike Johnson',
        paidById: 'user10',
        yourShare: -80,
        participants: ['user10', 'user11', 'user12', 'current-user'],
        settlementStatus: 'pending',
        createdAt: new Date('2025-09-20'),
        updatedAt: new Date('2025-09-20')
      },
      {
        id: '5',
        description: 'Netflix Subscription',
        amount: 649,
        category: 'entertainment',
        date: new Date('2025-09-19'),
        groupId: '3',
        groupName: 'Roommates',
        paidBy: 'Alex Chen',
        paidById: 'user7',
        yourShare: -162,
        participants: ['user7', 'user8', 'user9', 'current-user'],
        settlementStatus: 'settled',
        createdAt: new Date('2025-09-19'),
        updatedAt: new Date('2025-09-19')
      },
      {
        id: '6',
        description: 'Team Lunch at Office',
        amount: 1800,
        category: 'food',
        date: new Date('2025-09-18'),
        groupId: '4',
        groupName: 'Office Team',
        paidBy: 'You',
        paidById: 'current-user',
        yourShare: 225,
        participants: ['user10', 'user11', 'user12', 'user13', 'user14', 'user15', 'user16', 'current-user'],
        settlementStatus: 'pending',
        createdAt: new Date('2025-09-18'),
        updatedAt: new Date('2025-09-18')
      },
      // August expenses
      {
        id: '7',
        description: 'Concert Tickets',
        amount: 3200,
        category: 'entertainment',
        date: new Date('2025-08-15'),
        groupId: '2',
        groupName: 'Weekend Squad',
        paidBy: 'Sarah Wilson',
        paidById: 'user4',
        yourShare: -800,
        participants: ['user4', 'user5', 'user6', 'current-user'],
        settlementStatus: 'settled',
        createdAt: new Date('2025-08-15'),
        updatedAt: new Date('2025-08-15')
      },
      {
        id: '8',
        description: 'Electricity Bill',
        amount: 2800,
        category: 'utilities',
        date: new Date('2025-08-10'),
        groupId: '3',
        groupName: 'Roommates',
        paidBy: 'Emma Taylor',
        paidById: 'user8',
        yourShare: -700,
        participants: ['user7', 'user8', 'user9', 'current-user'],
        settlementStatus: 'settled',
        createdAt: new Date('2025-08-10'),
        updatedAt: new Date('2025-08-10')
      },
      {
        id: '9',
        description: 'Weekend Trip to Goa',
        amount: 12000,
        category: 'other',
        date: new Date('2025-08-05'),
        groupId: '1',
        groupName: 'College Friends',
        paidBy: 'You',
        paidById: 'current-user',
        yourShare: 2000,
        participants: ['user1', 'user2', 'user3', 'user17', 'user18', 'current-user'],
        settlementStatus: 'partially_settled',
        createdAt: new Date('2025-08-05'),
        updatedAt: new Date('2025-08-05')
      },
      {
        id: '10',
        description: 'Office Supplies',
        amount: 1500,
        category: 'other',
        date: new Date('2025-08-01'),
        groupId: '4',
        groupName: 'Office Team',
        paidBy: 'David Kim',
        paidById: 'user11',
        yourShare: -187,
        participants: ['user10', 'user11', 'user12', 'user13', 'user14', 'user15', 'user16', 'current-user'],
        settlementStatus: 'settled',
        createdAt: new Date('2025-08-01'),
        updatedAt: new Date('2025-08-01')
      }
    ];
  }

  /**
   * Load available groups
   */
  loadGroups(): void {
    this.availableGroups = [
      { id: '1', name: 'College Friends', icon: '🎓' },
      { id: '2', name: 'Weekend Squad', icon: '🎉' },
      { id: '3', name: 'Roommates', icon: '🏠' },
      { id: '4', name: 'Office Team', icon: '💼' }
    ];
  }

  /**
   * Calculate statistics
   */
  calculateStats(): void {
    const currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setHours(0, 0, 0, 0);

    const thisMonthExpenses = this.expenses.filter(expense => 
      expense.date >= currentMonth
    );

    this.totalExpenses = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    this.yourTotalShare = thisMonthExpenses.reduce((sum, expense) => sum + Math.abs(expense.yourShare), 0);
    this.netBalance = this.expenses.reduce((sum, expense) => sum + expense.yourShare, 0);
    this.totalExpenseCount = this.expenses.length;
  }

  /**
   * Apply filters and sorting
   */
  applyFiltersAndSort(): void {
    let filtered = [...this.expenses];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(expense => 
        expense.description.toLowerCase().includes(searchLower) ||
        expense.groupName.toLowerCase().includes(searchLower) ||
        expense.paidBy.toLowerCase().includes(searchLower)
      );
    }

    // Apply date filter
    if (this.dateFilter !== 'all') {
      const now = new Date();
      const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(startOfDay);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfQuarter = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);

      switch (this.dateFilter) {
        case 'today':
          filtered = filtered.filter(expense => expense.date >= startOfDay);
          break;
        case 'week':
          filtered = filtered.filter(expense => expense.date >= startOfWeek);
          break;
        case 'month':
          filtered = filtered.filter(expense => expense.date >= startOfMonth);
          break;
        case 'quarter':
          filtered = filtered.filter(expense => expense.date >= startOfQuarter);
          break;
      }
    }

    // Apply category filter
    if (this.categoryFilter !== 'all') {
      filtered = filtered.filter(expense => expense.category === this.categoryFilter);
    }

    // Apply group filter
    if (this.groupFilter !== 'all') {
      filtered = filtered.filter(expense => expense.groupId === this.groupFilter);
    }

    // Apply sorting
    switch (this.sortBy) {
      case 'date':
        filtered.sort((a, b) => b.date.getTime() - a.date.getTime());
        break;
      case 'amount':
        filtered.sort((a, b) => b.amount - a.amount);
        break;
      case 'name':
        filtered.sort((a, b) => a.description.localeCompare(b.description));
        break;
      case 'group':
        filtered.sort((a, b) => a.groupName.localeCompare(b.groupName));
        break;
    }

    this.filteredExpenses = filtered;
    this.groupExpensesByMonth();
  }

  /**
   * Group expenses by month
   */
  groupExpensesByMonth(): void {
    const groups: { [key: string]: MonthGroup } = {};

    this.filteredExpenses.forEach(expense => {
      const monthKey = expense.date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      
      if (!groups[monthKey]) {
        groups[monthKey] = {
          month: monthKey,
          total: 0,
          expenses: []
        };
      }

      groups[monthKey].total += expense.amount;
      groups[monthKey].expenses.push(expense);
    });

    this.groupedExpenses = Object.values(groups).sort((a, b) => {
      const dateA = new Date(a.month);
      const dateB = new Date(b.month);
      return dateB.getTime() - dateA.getTime();
    });
  }

  /**
   * Utility functions
   */
  formatAmount(amount: number): string {
    return Math.abs(amount).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  getAbsoluteValue(value: number): number {
    return Math.abs(value);
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }

  getCategoryIcon(category: string): string {
    const icons: { [key: string]: string } = {
      'food': '🍽️',
      'entertainment': '🎬',
      'groceries': '🛒',
      'transport': '🚗',
      'utilities': '💡',
      'shopping': '🛍️',
      'health': '⚕️',
      'education': '📚',
      'travel': '✈️',
      'other': '💰'
    };
    
    return icons[category] || icons['other'];
  }

  /**
   * Search functionality
   */
  onSearch(): void {
    this.applyFiltersAndSort();
  }

  /**
   * Filter dropdown toggles
   */
  toggleDateFilter(): void {
    this.isDateFilterOpen = !this.isDateFilterOpen;
    this.closeOtherDropdowns('date');
  }

  toggleCategoryFilter(): void {
    this.isCategoryFilterOpen = !this.isCategoryFilterOpen;
    this.closeOtherDropdowns('category');
  }

  toggleGroupFilter(): void {
    this.isGroupFilterOpen = !this.isGroupFilterOpen;
    this.closeOtherDropdowns('group');
  }

  toggleSortFilter(): void {
    this.isSortFilterOpen = !this.isSortFilterOpen;
    this.closeOtherDropdowns('sort');
  }

  closeOtherDropdowns(except: string): void {
    if (except !== 'date') this.isDateFilterOpen = false;
    if (except !== 'category') this.isCategoryFilterOpen = false;
    if (except !== 'group') this.isGroupFilterOpen = false;
    if (except !== 'sort') this.isSortFilterOpen = false;
  }

  /**
   * Filter setters
   */
  setDateFilter(filter: DateFilter): void {
    this.dateFilter = filter;
    this.isDateFilterOpen = false;
    this.applyFiltersAndSort();
  }

  setCategoryFilter(filter: CategoryFilter): void {
    this.categoryFilter = filter;
    this.isCategoryFilterOpen = false;
    this.applyFiltersAndSort();
  }

  setGroupFilter(groupId: string): void {
    this.groupFilter = groupId;
    this.isGroupFilterOpen = false;
    this.applyFiltersAndSort();
  }

  setSortBy(sortBy: SortBy): void {
    this.sortBy = sortBy;
    this.isSortFilterOpen = false;
    this.applyFiltersAndSort();
  }

  /**
   * Filter display text getters
   */
  getDateFilterText(): string {
    const texts = {
      all: 'All Time',
      today: 'Today',
      week: 'This Week',
      month: 'This Month',
      quarter: 'This Quarter'
    };
    return texts[this.dateFilter];
  }

  getCategoryFilterText(): string {
    const texts = {
      all: 'All Categories',
      food: '🍽️ Food & Dining',
      entertainment: '🎬 Entertainment',
      transport: '🚗 Transport',
      groceries: '🛒 Groceries',
      utilities: '💡 Utilities',
      other: '💰 Other'
    };
    return texts[this.categoryFilter];
  }

  getGroupFilterText(): string {
    if (this.groupFilter === 'all') return 'All Groups';
    const group = this.availableGroups.find(g => g.id === this.groupFilter);
    return group ? `${group.icon} ${group.name}` : 'All Groups';
  }

  getSortFilterText(): string {
    const texts = {
      date: 'Recent First',
      amount: 'Highest Amount',
      name: 'Expense Name',
      group: 'Group Name'
    };
    return texts[this.sortBy];
  }

  /**
   * Settlement status helpers
   */
  getSettlementStatusText(status: string): string {
    const texts = {
      pending: 'Pending',
      settled: 'Settled',
      partially_settled: 'Partially Settled'
    };
    return texts[status as keyof typeof texts] || status;
  }

  getSettlementStatusClass(status: string): string {
    const classes = {
      pending: 'status-pending',
      settled: 'status-settled',
      partially_settled: 'status-partial'
    };
    return classes[status as keyof typeof classes] || 'status-pending';
  }

  /**
   * Active filters check
   */
  hasActiveFilters(): boolean {
    return this.searchTerm.trim() !== '' ||
           this.dateFilter !== 'all' ||
           this.categoryFilter !== 'all' ||
           this.groupFilter !== 'all';
  }

  clearAllFilters(): void {
    this.searchTerm = '';
    this.dateFilter = 'all';
    this.categoryFilter = 'all';
    this.groupFilter = 'all';
    this.sortBy = 'date';
    this.applyFiltersAndSort();
  }

  /**
   * Empty state helpers
   */
  getEmptyStateTitle(): string {
    if (this.searchTerm) return 'No expenses found';
    if (this.hasActiveFilters()) return 'No expenses match your filters';
    return 'No expenses yet';
  }

  getEmptyStateDescription(): string {
    if (this.searchTerm) return `No expenses match "${this.searchTerm}". Try a different search term.`;
    if (this.hasActiveFilters()) return 'Try adjusting your filters or add a new expense.';
    return 'Start by adding your first expense to track spending with friends.';
  }

  /**
   * UI Actions
   */
  openAddExpenseModal(): void {
    console.log('Opening add expense modal...');
  }

  viewExpenseDetails(expense: Expense): void {
    console.log('Viewing expense details:', expense.id);
  }

  openExpenseMenu(expense: Expense, event: Event): void {
    event.stopPropagation();
    this.selectedExpense = expense;
  }

  closeExpenseMenu(): void {
    this.selectedExpense = null;
  }

  editExpense(expense: Expense): void {
    console.log('Editing expense:', expense.id);
    this.closeExpenseMenu();
  }

  duplicateExpense(expense: Expense): void {
    console.log('Duplicating expense:', expense.id);
    this.closeExpenseMenu();
  }

  settleExpense(expense: Expense): void {
    console.log('Settling expense:', expense.id);
    this.closeExpenseMenu();
  }

  shareExpense(expense: Expense): void {
    console.log('Sharing expense:', expense.id);
    this.closeExpenseMenu();
  }

  deleteExpense(expense: Expense): void {
    console.log('Deleting expense:', expense.id);
    this.closeExpenseMenu();
  }

  openSettleUpModal(): void {
    console.log('Opening settle up modal...');
  }

  viewExpenseAnalytics(): void {
    console.log('Opening expense analytics...');
  }

  exportExpenses(): void {
    console.log('Exporting expenses...');
  }
}
