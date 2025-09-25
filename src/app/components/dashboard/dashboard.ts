import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddExpenseDialog } from '../add-expense-dialog/add-expense-dialog';
import { SettleUpDialog } from '../settle-up-dialog/settle-up-dialog';
import { CreateGroupDialog } from '../create-group-dialog/create-group-dialog';
import { InviteFriendsDialog } from '../invite-friends-dialog/invite-friends-dialog';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
  groupName: string;
  yourShare: number;
  paidBy: string;
}

interface Group {
  id: string;
  name: string;
  memberCount: number;
  yourBalance: number;
  icon?: string;
  totalExpenses: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, AddExpenseDialog, SettleUpDialog, CreateGroupDialog, InviteFriendsDialog],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {
  
  // User data
  currentUser: User | null = null;
  
  // Dashboard statistics
  totalBalance: number = 0;
  monthlyExpenses: number = 0;
  activeGroups: number = 0;
  totalFriends: number = 0;
  
  // Dashboard data
  recentExpenses: Expense[] = [];
  userGroups: Group[] = [];
  
  // Dialog state
  showAddExpenseDialog: boolean = false;
  showSettleUpDialog: boolean = false;
  showCreateGroupDialog: boolean = false;
  showInviteFriendsDialog: boolean = false;

  ngOnInit(): void {
    this.loadDashboardData();
  }

  /**
   * Load dashboard data - in real app, this would come from a service
   */
  loadDashboardData(): void {
    // Mock current user data
    this.currentUser = {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com'
    };

    // Mock dashboard statistics
    this.totalBalance = 1250.75;
    this.monthlyExpenses = 8420.50;
    this.activeGroups = 5;
    this.totalFriends = 12;

    // Mock recent expenses data
    this.recentExpenses = [
      {
        id: '1',
        description: 'Dinner at Italian Restaurant',
        amount: 2400,
        category: 'food',
        date: new Date('2025-09-23'),
        groupName: 'College Friends',
        yourShare: 600,
        paidBy: 'You'
      },
      {
        id: '2',
        description: 'Movie Tickets',
        amount: 800,
        category: 'entertainment',
        date: new Date('2025-09-22'),
        groupName: 'Weekend Squad',
        yourShare: -200,
        paidBy: 'Sarah'
      },
      {
        id: '3',
        description: 'Grocery Shopping',
        amount: 1500,
        category: 'groceries',
        date: new Date('2025-09-21'),
        groupName: 'Roommates',
        yourShare: 375,
        paidBy: 'You'
      },
      {
        id: '4',
        description: 'Uber Ride',
        amount: 320,
        category: 'transport',
        date: new Date('2025-09-20'),
        groupName: 'Office Team',
        yourShare: -80,
        paidBy: 'Mike'
      }
    ];

    // Mock groups data
    this.userGroups = [
      {
        id: '1',
        name: 'College Friends',
        memberCount: 6,
        yourBalance: 450.25,
        icon: '🎓',
        totalExpenses: 15600
      },
      {
        id: '2',
        name: 'Roommates',
        memberCount: 4,
        yourBalance: -220.50,
        icon: '🏠',
        totalExpenses: 8900
      },
      {
        id: '3',
        name: 'Weekend Squad',
        memberCount: 5,
        yourBalance: 180.75,
        icon: '🎉',
        totalExpenses: 5400
      },
      {
        id: '4',
        name: 'Office Team',
        memberCount: 8,
        yourBalance: -125.00,
        icon: '💼',
        totalExpenses: 12300
      }
    ];
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
   * Format date for display
   */
  formatDate(date: Date): string {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short'
    });
  }

  /**
   * Get expense category icon
   */
  getExpenseIcon(category: string): string {
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
   * Get absolute value of a number
   */
  getAbsoluteValue(value: number): number {
    return Math.abs(value);
  }

  /**
   * Add new expense
   */
  addExpense(): void {
    console.log('Opening add expense dialog...');
    this.showAddExpenseDialog = true;
  }

  /**
   * Close add expense dialog
   */
  closeAddExpenseDialog(): void {
    this.showAddExpenseDialog = false;
  }

  /**
   * Handle expense saved event
   */
  onExpenseSaved(expenseData: any): void {
    console.log('Expense saved:', expenseData);
    
    // Add to recent expenses (mock implementation)
    const newExpense: Expense = {
      id: Math.random().toString(36).substr(2, 9),
      description: expenseData.description,
      amount: expenseData.amount,
      category: expenseData.category,
      date: new Date(expenseData.date),
      groupName: expenseData.groupName || 'General',
      yourShare: expenseData.yourShare || 0,
      paidBy: 'You'
    };
    
    this.recentExpenses.unshift(newExpense);
    
    // Close dialog
    this.showAddExpenseDialog = false;
    
    // You could also refresh dashboard data here
    // this.loadDashboardData();
  }

  /**
   * View all expenses
   */
  viewAllExpenses(): void {
    console.log('Viewing all expenses...');
    // Navigate to expenses page
  }

  /**
   * View expense details
   */
  viewExpenseDetails(expense: Expense): void {
    console.log('Viewing expense details:', expense.id);
    // Navigate to expense details page or open modal
  }

  /**
   * View all groups
   */
  viewAllGroups(): void {
    console.log('Viewing all groups...');
    // Navigate to groups page
  }

  /**
   * View group details
   */
  viewGroupDetails(group: Group): void {
    console.log('Viewing group details:', group.id);
    // Navigate to group details page
  }

  /**
   * Create new group
   */
  createGroup(): void {
    console.log('Opening create group dialog...');
    this.showCreateGroupDialog = true;
  }

  /**
   * Close create group dialog
   */
  closeCreateGroupDialog(): void {
    this.showCreateGroupDialog = false;
  }

  /**
   * Handle group created event
   */
  onGroupCreated(groupData: any): void {
    console.log('Group created:', groupData);
    
    // Add to user groups (mock implementation)
    const newGroup: Group = {
      id: Math.random().toString(36).substr(2, 9),
      name: groupData.name,
      memberCount: groupData.members?.length || 1,
      yourBalance: 0,
      icon: groupData.icon || '👥',
      totalExpenses: 0
    };
    
    this.userGroups.unshift(newGroup);
    this.activeGroups = this.userGroups.length;
    
    // Close dialog
    this.showCreateGroupDialog = false;
  }

  /**
   * Settle up balances
   */
  settleUp(): void {
    console.log('Opening settle up dialog...');
    this.showSettleUpDialog = true;
  }

  /**
   * Close settle up dialog
   */
  closeSettleUpDialog(): void {
    this.showSettleUpDialog = false;
  }

  /**
   * Handle settlement completed event
   */
  onSettlementCompleted(settlementData: any): void {
    console.log('Settlement completed:', settlementData);
    
    // Update balances (mock implementation)
    // In real app, this would update the user's balance data
    
    // Close dialog
    this.showSettleUpDialog = false;
    
    // Refresh dashboard data
    this.loadDashboardData();
  }

  /**
   * Invite friends
   */
  inviteFriends(): void {
    console.log('Opening invite friends dialog...');
    this.showInviteFriendsDialog = true;
  }

  /**
   * Close invite friends dialog
   */
  closeInviteFriendsDialog(): void {
    this.showInviteFriendsDialog = false;
  }

  /**
   * Handle friends invited event
   */
  onFriendsInvited(inviteData: any): void {
    console.log('Friends invited:', inviteData);
    
    // Update friends count (mock implementation)
    this.totalFriends += inviteData.invitedCount || 0;
    
    // Close dialog
    this.showInviteFriendsDialog = false;
  }
}
