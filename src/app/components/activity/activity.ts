import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces
export interface ActivityParticipant {
  id: string;
  name: string;
  avatar?: string;
}

export interface ActivityDetail {
  label: string;
  value: string;
}

export interface ActivityAction {
  type: 'approve' | 'reject' | 'pay' | 'remind' | 'view';
  label: string;
  icon: string;
}

export interface ActivityItem {
  id: string;
  type: 'expense' | 'payment' | 'friend' | 'group' | 'reminder' | 'settlement';
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  amount?: number;
  details?: ActivityDetail[];
  actions?: ActivityAction[];
  participants?: ActivityParticipant[];
  groupId?: string;
  relatedId?: string;
}

export interface ActivityGroup {
  date: string;
  activities: ActivityItem[];
}

export type ActivityTab = 'all' | 'expenses' | 'payments' | 'friends' | 'groups';
export type TimeFilter = 'today' | 'week' | 'month' | 'all';

@Component({
  selector: 'app-activity',
  imports: [CommonModule, FormsModule],
  templateUrl: './activity.html',
  styleUrl: './activity.scss'
})
export class Activity implements OnInit {
  // Component state
  activities: ActivityItem[] = [];
  filteredActivities: ActivityItem[] = [];
  
  // Filters and tabs
  activeTab: ActivityTab = 'all';
  timeFilter: TimeFilter = 'week';
  
  // UI state
  showTimeFilter: boolean = false;
  selectedActivityId: string | null = null;
  hasMoreActivities: boolean = true;
  isLoadingMore: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 20;

  ngOnInit() {
    this.loadMockData();
    this.filterActivities();
  }

  // Mock Data Service
  private loadMockData() {
    const now = new Date();
    
    this.activities = [
      {
        id: '1',
        type: 'expense',
        title: 'New expense added',
        description: '<strong>Alice Johnson</strong> added an expense for <strong>Dinner at Italian Restaurant</strong>',
        timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
        isRead: false,
        amount: 85.50,
        details: [
          { label: 'Category', value: 'Food & Dining' },
          { label: 'Group', value: 'College Friends' },
          { label: 'Split between', value: '4 people' }
        ],
        participants: [
          { id: '1', name: 'Alice Johnson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
          { id: '2', name: 'You', avatar: '' },
          { id: '3', name: 'Bob Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
          { id: '4', name: 'Carol Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol' }
        ],
        actions: [
          { type: 'view', label: 'View Details', icon: '👁️' },
          { type: 'pay', label: 'Settle Up', icon: '💳' }
        ]
      },
      {
        id: '2',
        type: 'payment',
        title: 'Payment received',
        description: '<strong>Bob Smith</strong> paid you <strong>$45.25</strong> for shared expenses',
        timestamp: new Date(now.getTime() - 4 * 60 * 60 * 1000), // 4 hours ago
        isRead: false,
        amount: 45.25,
        details: [
          { label: 'Payment method', value: 'Venmo' },
          { label: 'For expenses', value: 'Movie night, Coffee shop' }
        ],
        participants: [
          { id: '2', name: 'Bob Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' }
        ],
        actions: [
          { type: 'view', label: 'View Transaction', icon: '📄' }
        ]
      },
      {
        id: '3',
        type: 'friend',
        title: 'New friend request',
        description: '<strong>Emma Brown</strong> sent you a friend request',
        timestamp: new Date(now.getTime() - 6 * 60 * 60 * 1000), // 6 hours ago
        isRead: true,
        participants: [
          { id: '5', name: 'Emma Brown', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma' }
        ],
        actions: [
          { type: 'approve', label: 'Accept', icon: '✅' },
          { type: 'reject', label: 'Decline', icon: '❌' }
        ]
      },
      {
        id: '4',
        type: 'group',
        title: 'Added to group',
        description: '<strong>Carol Davis</strong> added you to the group <strong>Travel Buddies</strong>',
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        isRead: true,
        details: [
          { label: 'Group members', value: '6 people' },
          { label: 'Created by', value: 'Carol Davis' }
        ],
        participants: [
          { id: '3', name: 'Carol Davis', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol' }
        ],
        actions: [
          { type: 'view', label: 'View Group', icon: '👥' }
        ]
      },
      {
        id: '5',
        type: 'expense',
        title: 'Expense updated',
        description: '<strong>David Wilson</strong> updated the expense <strong>Gas for road trip</strong>',
        timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        isRead: true,
        amount: 120.00,
        details: [
          { label: 'Previous amount', value: '$100.00' },
          { label: 'New amount', value: '$120.00' },
          { label: 'Reason', value: 'Added toll fees' }
        ],
        participants: [
          { id: '4', name: 'David Wilson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David' }
        ],
        actions: [
          { type: 'view', label: 'View Changes', icon: '📝' }
        ]
      },
      {
        id: '6',
        type: 'reminder',
        title: 'Payment reminder',
        description: '<strong>Grace Lee</strong> sent you a reminder for <strong>$15.75</strong>',
        timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        isRead: true,
        amount: -15.75,
        details: [
          { label: 'For expense', value: 'Coffee and snacks' },
          { label: 'Due date', value: 'Today' }
        ],
        participants: [
          { id: '7', name: 'Grace Lee', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace' }
        ],
        actions: [
          { type: 'pay', label: 'Pay Now', icon: '💳' },
          { type: 'remind', label: 'Ask for Extension', icon: '⏰' }
        ]
      },
      {
        id: '7',
        type: 'settlement',
        title: 'Settlement completed',
        description: 'You settled up with <strong>Frank Miller</strong> for <strong>$30.00</strong>',
        timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        isRead: true,
        amount: 30.00,
        details: [
          { label: 'Settlement method', value: 'Cash' },
          { label: 'Expenses settled', value: '3 expenses' }
        ],
        participants: [
          { id: '6', name: 'Frank Miller', avatar: '' }
        ],
        actions: [
          { type: 'view', label: 'View Receipt', icon: '🧾' }
        ]
      },
      {
        id: '8',
        type: 'friend',
        title: 'Friend accepted',
        description: '<strong>Henry Taylor</strong> accepted your friend request',
        timestamp: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
        isRead: true,
        participants: [
          { id: '8', name: 'Henry Taylor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Henry' }
        ],
        actions: [
          { type: 'view', label: 'View Profile', icon: '👤' }
        ]
      },
      {
        id: '9',
        type: 'expense',
        title: 'Expense deleted',
        description: '<strong>Isabel Garcia</strong> deleted the expense <strong>Concert tickets</strong>',
        timestamp: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        isRead: true,
        amount: 75.00,
        details: [
          { label: 'Reason', value: 'Event was cancelled' },
          { label: 'Refund processed', value: 'Yes' }
        ],
        participants: [
          { id: '9', name: 'Isabel Garcia', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabel' }
        ]
      },
      {
        id: '10',
        type: 'payment',
        title: 'Payment sent',
        description: 'You paid <strong>Jack Thompson</strong> <strong>$22.50</strong>',
        timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
        isRead: true,
        amount: -22.50,
        details: [
          { label: 'Payment method', value: 'PayPal' },
          { label: 'For expense', value: 'Lunch at food court' }
        ],
        participants: [
          { id: '10', name: 'Jack Thompson', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack' }
        ],
        actions: [
          { type: 'view', label: 'View Receipt', icon: '📄' }
        ]
      }
    ];
  }

  // Statistics Methods
  getTotalActivities(): number {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return this.activities.filter(a => a.timestamp >= oneMonthAgo).length;
  }

  getUnreadActivities(): number {
    return this.activities.filter(a => !a.isRead).length;
  }

  getRecentExpenses(): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return this.activities.filter(a => 
      a.type === 'expense' && a.timestamp >= oneWeekAgo
    ).length;
  }

  getFriendActivity(): number {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return this.activities.filter(a => 
      (a.type === 'friend' || a.type === 'group') && a.timestamp >= oneWeekAgo
    ).length;
  }

  // Tab Methods
  setActiveTab(tab: ActivityTab) {
    this.activeTab = tab;
    this.filterActivities();
  }

  getAllActivitiesCount(): number {
    return this.activities.length;
  }

  getExpenseActivitiesCount(): number {
    return this.activities.filter(a => a.type === 'expense').length;
  }

  getPaymentActivitiesCount(): number {
    return this.activities.filter(a => 
      a.type === 'payment' || a.type === 'settlement'
    ).length;
  }

  getFriendActivitiesCount(): number {
    return this.activities.filter(a => a.type === 'friend').length;
  }

  getGroupActivitiesCount(): number {
    return this.activities.filter(a => a.type === 'group').length;
  }

  // Time Filter Methods
  toggleTimeFilter() {
    this.showTimeFilter = !this.showTimeFilter;
  }

  setTimeFilter(filter: TimeFilter) {
    this.timeFilter = filter;
    this.showTimeFilter = false;
    this.filterActivities();
  }

  getTimeFilterLabel(): string {
    const labels = {
      today: 'Today',
      week: 'This Week',
      month: 'This Month',
      all: 'All Time'
    };
    return labels[this.timeFilter];
  }

  // Filter Methods
  filterActivities() {
    let filtered = [...this.activities];

    // Apply tab filter
    if (this.activeTab !== 'all') {
      if (this.activeTab === 'payments') {
        filtered = filtered.filter(a => 
          a.type === 'payment' || a.type === 'settlement'
        );
      } else if (this.activeTab === 'expenses') {
        filtered = filtered.filter(a => a.type === 'expense');
      } else if (this.activeTab === 'friends') {
        filtered = filtered.filter(a => a.type === 'friend');
      } else if (this.activeTab === 'groups') {
        filtered = filtered.filter(a => a.type === 'group');
      }
    }

    // Apply time filter
    if (this.timeFilter !== 'all') {
      const now = new Date();
      let cutoffDate = new Date();

      switch (this.timeFilter) {
        case 'today':
          cutoffDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          cutoffDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          cutoffDate.setMonth(now.getMonth() - 1);
          break;
      }

      filtered = filtered.filter(a => a.timestamp >= cutoffDate);
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    this.filteredActivities = filtered;
  }

  // Grouping Methods
  getGroupedActivities(): ActivityGroup[] {
    const groups: { [key: string]: ActivityItem[] } = {};
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    this.filteredActivities.forEach(activity => {
      const activityDate = activity.timestamp;
      let dateKey: string;

      if (this.isSameDate(activityDate, today)) {
        dateKey = 'Today';
      } else if (this.isSameDate(activityDate, yesterday)) {
        dateKey = 'Yesterday';
      } else if (this.isThisWeek(activityDate)) {
        dateKey = activityDate.toLocaleDateString('en-US', { weekday: 'long' });
      } else {
        dateKey = activityDate.toLocaleDateString('en-US', { 
          month: 'long', 
          day: 'numeric',
          year: activityDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
        });
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(activity);
    });

    return Object.keys(groups).map(date => ({
      date,
      activities: groups[date]
    }));
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString();
  }

  private isThisWeek(date: Date): boolean {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    weekStart.setHours(0, 0, 0, 0);
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);
    
    return date >= weekStart && date <= weekEnd;
  }

  // Activity Display Methods
  getActivityClass(activity: ActivityItem): string {
    return `activity-${activity.type}`;
  }

  getActivityIcon(type: string): string {
    const icons = {
      expense: '💸',
      payment: '💳',
      friend: '👤',
      group: '👥',
      reminder: '🔔',
      settlement: '⚖️'
    };
    return icons[type as keyof typeof icons] || '📋';
  }

  getAmountClass(amount: number): string {
    if (amount > 0) return 'positive';
    if (amount < 0) return 'negative';
    return 'neutral';
  }

  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  }

  getParticipantsText(participants: ActivityParticipant[]): string {
    if (participants.length <= 3) {
      return participants.map(p => p.name).join(', ');
    } else {
      const first = participants.slice(0, 2).map(p => p.name).join(', ');
      return `${first} and ${participants.length - 2} others`;
    }
  }

  // Activity Actions
  handleActivityAction(activityId: string, actionType: string) {
    console.log(`Handling ${actionType} for activity ${activityId}`);
    // Implementation for different action types
    switch (actionType) {
      case 'view':
        this.selectedActivityId = activityId;
        break;
      case 'approve':
        this.approveAction(activityId);
        break;
      case 'reject':
        this.rejectAction(activityId);
        break;
      case 'pay':
        this.payAction(activityId);
        break;
      case 'remind':
        this.remindAction(activityId);
        break;
    }
  }

  private approveAction(activityId: string) {
    const activity = this.activities.find(a => a.id === activityId);
    if (activity) {
      activity.actions = activity.actions?.filter(a => a.type !== 'approve' && a.type !== 'reject');
      console.log('Approved:', activity.title);
    }
  }

  private rejectAction(activityId: string) {
    console.log('Rejected activity:', activityId);
    this.activities = this.activities.filter(a => a.id !== activityId);
    this.filterActivities();
  }

  private payAction(activityId: string) {
    console.log('Initiating payment for activity:', activityId);
    // Implementation for payment
  }

  private remindAction(activityId: string) {
    console.log('Sending reminder for activity:', activityId);
    // Implementation for reminder
  }

  // Activity Management
  markAllAsRead() {
    this.activities.forEach(activity => {
      activity.isRead = true;
    });
    console.log('All activities marked as read');
  }

  markAsRead(activityId: string) {
    const activity = this.activities.find(a => a.id === activityId);
    if (activity) {
      activity.isRead = true;
    }
  }

  refreshActivities() {
    this.isLoadingMore = true;
    // Simulate API call
    setTimeout(() => {
      this.loadMockData();
      this.filterActivities();
      this.isLoadingMore = false;
      console.log('Activities refreshed');
    }, 1000);
  }

  loadMoreActivities() {
    this.isLoadingMore = true;
    // Simulate loading more activities
    setTimeout(() => {
      this.currentPage++;
      this.isLoadingMore = false;
      
      // Check if we have more activities to load
      if (this.currentPage >= 3) {
        this.hasMoreActivities = false;
      }
      
      console.log('Loaded more activities');
    }, 1500);
  }

  // Modal Methods
  closeActivityDetail() {
    this.selectedActivityId = null;
  }

  getSelectedActivity(): ActivityItem | undefined {
    return this.activities.find(a => a.id === this.selectedActivityId);
  }

  // Helper Methods
  hasActiveFilters(): boolean {
    return this.activeTab !== 'all' || this.timeFilter !== 'all';
  }

  clearFilters() {
    this.activeTab = 'all';
    this.timeFilter = 'all';
    this.filterActivities();
  }

  getEmptyStateMessage(): string {
    if (this.hasActiveFilters()) {
      return 'No activities match your current filters. Try adjusting your search criteria.';
    }
    return 'You don\'t have any activities yet. Start by adding expenses or connecting with friends!';
  }

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }
}
