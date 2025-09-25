import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreateGroupDialog } from '../create-group-dialog/create-group-dialog';

interface Member {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Group {
  id: string;
  name: string;
  icon: string;
  memberCount: number;
  yourBalance: number;
  totalExpenses: number;
  expenseCount: number;
  lastActivity: Date;
  members: Member[];
  status: 'active' | 'settled' | 'inactive';
  createdAt: Date;
  createdBy: string;
}

type FilterType = 'all' | 'active' | 'settled' | 'owed' | 'owing';
type SortType = 'name' | 'balance' | 'activity' | 'members';

@Component({
  selector: 'app-groups',
  imports: [CommonModule, FormsModule, CreateGroupDialog],
  templateUrl: './groups.html',
  styleUrl: './groups.scss'
})
export class Groups implements OnInit {
  
  // Component state
  groups: Group[] = [];
  filteredGroups: Group[] = [];
  selectedGroup: Group | null = null;
  
  // Search and filter state
  searchTerm: string = '';
  currentFilter: FilterType = 'all';
  currentSort: SortType = 'activity';
  isFilterDropdownOpen: boolean = false;
  isSortDropdownOpen: boolean = false;
  
  // Statistics
  totalGroups: number = 0;
  activeGroups: number = 0;
  totalBalance: number = 0;
  totalMembers: number = 0;

  // Dialog state
  isCreateGroupDialogOpen: boolean = false;

  ngOnInit(): void {
    this.loadGroups();
    this.calculateStats();
    this.applyFiltersAndSort();
  }

  /**
   * Load groups data - in real app, this would come from a service
   */
  loadGroups(): void {
    // Mock groups data
    this.groups = [
      {
        id: '1',
        name: 'College Friends',
        icon: '🎓',
        memberCount: 6,
        yourBalance: 450.25,
        totalExpenses: 15600,
        expenseCount: 42,
        lastActivity: new Date('2025-09-23'),
        status: 'active',
        createdAt: new Date('2025-08-01'),
        createdBy: 'You',
        members: [
          { id: '1', name: 'John Doe', email: 'john@example.com' },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
          { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
          { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com' },
          { id: '5', name: 'Tom Brown', email: 'tom@example.com' },
          { id: '6', name: 'Lisa Davis', email: 'lisa@example.com' }
        ]
      },
      {
        id: '2',
        name: 'Roommates',
        icon: '🏠',
        memberCount: 4,
        yourBalance: -220.50,
        totalExpenses: 8900,
        expenseCount: 28,
        lastActivity: new Date('2025-09-22'),
        status: 'active',
        createdAt: new Date('2025-07-15'),
        createdBy: 'Mike Johnson',
        members: [
          { id: '1', name: 'John Doe', email: 'john@example.com' },
          { id: '3', name: 'Mike Johnson', email: 'mike@example.com' },
          { id: '7', name: 'Alex Chen', email: 'alex@example.com' },
          { id: '8', name: 'Emma Taylor', email: 'emma@example.com' }
        ]
      },
      {
        id: '3',
        name: 'Weekend Squad',
        icon: '🎉',
        memberCount: 5,
        yourBalance: 180.75,
        totalExpenses: 5400,
        expenseCount: 15,
        lastActivity: new Date('2025-09-20'),
        status: 'active',
        createdAt: new Date('2025-08-20'),
        createdBy: 'Sarah Wilson',
        members: [
          { id: '1', name: 'John Doe', email: 'john@example.com' },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
          { id: '4', name: 'Sarah Wilson', email: 'sarah@example.com' },
          { id: '9', name: 'Chris Lee', email: 'chris@example.com' },
          { id: '10', name: 'Amy Garcia', email: 'amy@example.com' }
        ]
      },
      {
        id: '4',
        name: 'Office Team',
        icon: '💼',
        memberCount: 8,
        yourBalance: -125.00,
        totalExpenses: 12300,
        expenseCount: 35,
        lastActivity: new Date('2025-09-19'),
        status: 'active',
        createdAt: new Date('2025-06-01'),
        createdBy: 'You',
        members: [
          { id: '1', name: 'John Doe', email: 'john@example.com' },
          { id: '11', name: 'David Kim', email: 'david@example.com' },
          { id: '12', name: 'Rachel Green', email: 'rachel@example.com' },
          { id: '13', name: 'Mark Wilson', email: 'mark@example.com' },
          { id: '14', name: 'Nicole Brown', email: 'nicole@example.com' },
          { id: '15', name: 'James Miller', email: 'james@example.com' },
          { id: '16', name: 'Jessica Davis', email: 'jessica@example.com' },
          { id: '17', name: 'Robert Taylor', email: 'robert@example.com' }
        ]
      },
      {
        id: '5',
        name: 'Family Vacation',
        icon: '✈️',
        memberCount: 7,
        yourBalance: 0.00,
        totalExpenses: 45000,
        expenseCount: 23,
        lastActivity: new Date('2025-08-15'),
        status: 'settled',
        createdAt: new Date('2025-07-01'),
        createdBy: 'You',
        members: [
          { id: '1', name: 'John Doe', email: 'john@example.com' },
          { id: '18', name: 'Mom', email: 'mom@example.com' },
          { id: '19', name: 'Dad', email: 'dad@example.com' },
          { id: '20', name: 'Sister', email: 'sister@example.com' },
          { id: '21', name: 'Brother', email: 'brother@example.com' },
          { id: '22', name: 'Uncle', email: 'uncle@example.com' },
          { id: '23', name: 'Aunt', email: 'aunt@example.com' }
        ]
      },
      {
        id: '6',
        name: 'Gym Buddies',
        icon: '💪',
        memberCount: 3,
        yourBalance: 50.00,
        totalExpenses: 2400,
        expenseCount: 8,
        lastActivity: new Date('2025-09-18'),
        status: 'active',
        createdAt: new Date('2025-08-10'),
        createdBy: 'Tom Brown',
        members: [
          { id: '1', name: 'John Doe', email: 'john@example.com' },
          { id: '5', name: 'Tom Brown', email: 'tom@example.com' },
          { id: '24', name: 'Kevin White', email: 'kevin@example.com' }
        ]
      }
    ];
  }

  /**
   * Calculate statistics
   */
  calculateStats(): void {
    this.totalGroups = this.groups.length;
    this.activeGroups = this.groups.filter(g => g.status === 'active').length;
    this.totalBalance = this.groups.reduce((sum, group) => sum + group.yourBalance, 0);
    this.totalMembers = this.groups.reduce((sum, group) => sum + group.memberCount, 0);
  }

  /**
   * Apply filters and sorting
   */
  applyFiltersAndSort(): void {
    let filtered = [...this.groups];

    // Apply search filter
    if (this.searchTerm.trim()) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(group => 
        group.name.toLowerCase().includes(searchLower) ||
        group.members.some(member => member.name.toLowerCase().includes(searchLower))
      );
    }

    // Apply category filter
    switch (this.currentFilter) {
      case 'active':
        filtered = filtered.filter(g => g.status === 'active');
        break;
      case 'settled':
        filtered = filtered.filter(g => g.status === 'settled');
        break;
      case 'owed':
        filtered = filtered.filter(g => g.yourBalance > 0);
        break;
      case 'owing':
        filtered = filtered.filter(g => g.yourBalance < 0);
        break;
    }

    // Apply sorting
    switch (this.currentSort) {
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'balance':
        filtered.sort((a, b) => Math.abs(b.yourBalance) - Math.abs(a.yourBalance));
        break;
      case 'activity':
        filtered.sort((a, b) => b.lastActivity.getTime() - a.lastActivity.getTime());
        break;
      case 'members':
        filtered.sort((a, b) => b.memberCount - a.memberCount);
        break;
    }

    this.filteredGroups = filtered;
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
   * Get absolute value
   */
  getAbsoluteValue(value: number): number {
    return Math.abs(value);
  }

  /**
   * Format date for display
   */
  formatDate(date: Date): string {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  }

  /**
   * Search functionality
   */
  onSearch(): void {
    this.applyFiltersAndSort();
  }

  /**
   * Toggle filter dropdown
   */
  toggleFilterDropdown(): void {
    this.isFilterDropdownOpen = !this.isFilterDropdownOpen;
    if (this.isFilterDropdownOpen) {
      this.isSortDropdownOpen = false;
    }
  }

  /**
   * Toggle sort dropdown
   */
  toggleSortDropdown(): void {
    this.isSortDropdownOpen = !this.isSortDropdownOpen;
    if (this.isSortDropdownOpen) {
      this.isFilterDropdownOpen = false;
    }
  }

  /**
   * Set filter
   */
  setFilter(filter: FilterType): void {
    this.currentFilter = filter;
    this.isFilterDropdownOpen = false;
    this.applyFiltersAndSort();
  }

  /**
   * Set sort
   */
  setSort(sort: SortType): void {
    this.currentSort = sort;
    this.isSortDropdownOpen = false;
    this.applyFiltersAndSort();
  }

  /**
   * Get filter display text
   */
  getFilterDisplayText(): string {
    const filterTexts = {
      all: 'All Groups',
      active: 'Active Groups',
      settled: 'Settled Groups',
      owed: 'Groups You\'re Owed',
      owing: 'Groups You Owe'
    };
    return filterTexts[this.currentFilter];
  }

  /**
   * Get sort display text
   */
  getSortDisplayText(): string {
    const sortTexts = {
      name: 'Group Name',
      balance: 'Balance Amount',
      activity: 'Recent Activity',
      members: 'Member Count'
    };
    return sortTexts[this.currentSort];
  }

  /**
   * Get balance percentage for progress bar
   */
  getBalancePercentage(group: Group): number {
    const maxBalance = Math.max(...this.groups.map(g => Math.abs(g.yourBalance)));
    return maxBalance > 0 ? (Math.abs(group.yourBalance) / maxBalance) * 100 : 0;
  }

  /**
   * Get group status
   */
  getGroupStatus(group: Group): string {
    if (group.status === 'settled') return 'Settled';
    if (group.yourBalance === 0) return 'All settled';
    if (group.yourBalance > 0) return 'You are owed';
    return 'You owe';
  }

  /**
   * Get group status CSS class
   */
  getGroupStatusClass(group: Group): string {
    if (group.status === 'settled') return 'status-settled';
    if (group.yourBalance === 0) return 'status-settled';
    if (group.yourBalance > 0) return 'status-owed';
    return 'status-owing';
  }

  /**
   * Get empty state title
   */
  getEmptyStateTitle(): string {
    if (this.searchTerm) return 'No groups found';
    if (this.currentFilter !== 'all') return 'No groups match your filter';
    return 'No groups yet';
  }

  /**
   * Get empty state description
   */
  getEmptyStateDescription(): string {
    if (this.searchTerm) return `No groups match "${this.searchTerm}". Try a different search term.`;
    if (this.currentFilter !== 'all') return 'Try adjusting your filters or create a new group.';
    return 'Create your first group to start sharing expenses with friends and family.';
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.searchTerm = '';
    this.currentFilter = 'all';
    this.currentSort = 'activity';
    this.applyFiltersAndSort();
  }

  // UI Actions
  /**
   * Open create group modal
   */
  openCreateGroupModal(): void {
    this.isCreateGroupDialogOpen = true;
  }

  /**
   * View group details
   */
  viewGroupDetails(group: Group): void {
    console.log('Viewing group details:', group.id);
    // Navigate to group details page
  }

  /**
   * Open group menu
   */
  openGroupMenu(group: Group, event: Event): void {
    event.stopPropagation();
    this.selectedGroup = group;
  }

  /**
   * Close group menu
   */
  closeGroupMenu(): void {
    this.selectedGroup = null;
  }

  /**
   * Edit group
   */
  editGroup(group: Group): void {
    console.log('Editing group:', group.id);
    this.closeGroupMenu();
  }

  /**
   * Add expense to group
   */
  addExpenseToGroup(group: Group): void {
    console.log('Adding expense to group:', group.id);
    this.closeGroupMenu();
  }

  /**
   * Settle group
   */
  settleGroup(group: Group): void {
    console.log('Settling group:', group.id);
    this.closeGroupMenu();
  }

  /**
   * Invite to group
   */
  inviteToGroup(group: Group): void {
    console.log('Inviting to group:', group.id);
    this.closeGroupMenu();
  }

  /**
   * Leave group
   */
  leaveGroup(group: Group): void {
    console.log('Leaving group:', group.id);
    this.closeGroupMenu();
  }

  /**
   * Join group
   */
  joinGroup(): void {
    console.log('Opening join group modal...');
  }

  /**
   * Settle all debts
   */
  settleAllDebts(): void {
    console.log('Opening settle all debts...');
  }

  /**
   * View group analytics
   */
  viewGroupAnalytics(): void {
    console.log('Opening group analytics...');
  }

  // Dialog Event Handlers
  /**
   * Handle create group dialog close
   */
  onCreateGroupDialogClose(): void {
    this.isCreateGroupDialogOpen = false;
  }

  /**
   * Handle group creation
   */
  onGroupCreated(groupData: any): void {
    console.log('New group created:', groupData);
    
    // Create a new group object from the form data
    const newGroup: Group = {
      id: (this.groups.length + 1).toString(),
      name: groupData.name,
      icon: groupData.icon || '👥',
      memberCount: (groupData.members?.length || 0) + 1, // +1 for current user
      yourBalance: 0,
      totalExpenses: 0,
      expenseCount: 0,
      lastActivity: new Date(),
      status: 'active',
      createdAt: new Date(),
      createdBy: 'You',
      members: [
        // Add current user as first member
        { id: '1', name: 'You', email: 'you@example.com' },
        // Add other members from form
        ...(groupData.members || []).map((member: any, index: number) => ({
          id: (index + 2).toString(),
          name: member.name || member.email.split('@')[0],
          email: member.email,
          avatar: member.avatar
        }))
      ]
    };

    // Add to the groups array at the beginning (most recent first)
    this.groups.unshift(newGroup);
    
    // Recalculate statistics
    this.calculateStats();
    
    // Re-apply filters and sorting
    this.applyFiltersAndSort();
    
    // Close the dialog
    this.isCreateGroupDialogOpen = false;
  }
}
