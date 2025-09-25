import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces
export interface Friend {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'pending' | 'blocked';
  friendsSince: Date;
  lastActivity: Date;
  sharedExpenses: number;
  totalOwed: number;
  phone?: string;
  groups: string[];
}

export interface FriendRequest {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  requestDate: Date;
  message?: string;
}

export type StatusFilter = 'all' | 'active' | 'pending' | 'blocked';
export type SortBy = 'name' | 'recent' | 'activity';

@Component({
  selector: 'app-friends',
  imports: [CommonModule, FormsModule],
  templateUrl: './friends.html',
  styleUrl: './friends.scss'
})
export class Friends implements OnInit {
  // Component state
  friends: Friend[] = [];
  friendRequests: FriendRequest[] = [];
  filteredFriends: Friend[] = [];
  
  // Search and filters
  searchQuery: string = '';
  statusFilter: StatusFilter = 'all';
  sortBy: SortBy = 'name';
  
  // UI state
  showStatusFilter: boolean = false;
  showSortFilter: boolean = false;
  selectedFriendId: string | null = null;
  isLoading: boolean = false;

  ngOnInit() {
    this.loadMockData();
    this.filterFriends();
  }

  // Mock Data Service
  private loadMockData() {
    this.friends = [
      {
        id: '1',
        name: 'Alice Johnson',
        email: 'alice.johnson@email.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
        status: 'active',
        friendsSince: new Date('2024-01-15'),
        lastActivity: new Date('2024-12-20'),
        sharedExpenses: 15,
        totalOwed: 125.50,
        phone: '+1 (555) 123-4567',
        groups: ['College Friends', 'Travel Buddies']
      },
      {
        id: '2',
        name: 'Bob Smith',
        email: 'bob.smith@email.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
        status: 'active',
        friendsSince: new Date('2024-03-22'),
        lastActivity: new Date('2024-12-18'),
        sharedExpenses: 8,
        totalOwed: -75.25,
        phone: '+1 (555) 234-5678',
        groups: ['Work Colleagues']
      },
      {
        id: '3',
        name: 'Carol Davis',
        email: 'carol.davis@email.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carol',
        status: 'active',
        friendsSince: new Date('2024-02-10'),
        lastActivity: new Date('2024-12-22'),
        sharedExpenses: 22,
        totalOwed: 0,
        groups: ['College Friends', 'Gym Buddies']
      },
      {
        id: '4',
        name: 'David Wilson',
        email: 'david.wilson@email.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        status: 'active',
        friendsSince: new Date('2024-05-08'),
        lastActivity: new Date('2024-12-15'),
        sharedExpenses: 12,
        totalOwed: 45.75,
        groups: ['Travel Buddies']
      },
      {
        id: '5',
        name: 'Emma Brown',
        email: 'emma.brown@email.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
        status: 'active',
        friendsSince: new Date('2024-04-12'),
        lastActivity: new Date('2024-12-21'),
        sharedExpenses: 18,
        totalOwed: -30.00,
        groups: ['Work Colleagues', 'Gym Buddies']
      },
      {
        id: '6',
        name: 'Frank Miller',
        email: 'frank.miller@email.com',
        status: 'pending',
        friendsSince: new Date('2024-12-20'),
        lastActivity: new Date('2024-12-20'),
        sharedExpenses: 0,
        totalOwed: 0,
        groups: []
      },
      {
        id: '7',
        name: 'Grace Lee',
        email: 'grace.lee@email.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace',
        status: 'active',
        friendsSince: new Date('2024-06-15'),
        lastActivity: new Date('2024-12-19'),
        sharedExpenses: 6,
        totalOwed: 20.50,
        groups: ['College Friends']
      },
      {
        id: '8',
        name: 'Henry Taylor',
        email: 'henry.taylor@email.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Henry',
        status: 'blocked',
        friendsSince: new Date('2024-01-20'),
        lastActivity: new Date('2024-11-15'),
        sharedExpenses: 3,
        totalOwed: -15.75,
        groups: []
      }
    ];

    this.friendRequests = [
      {
        id: 'req1',
        name: 'Isabel Garcia',
        email: 'isabel.garcia@email.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabel',
        requestDate: new Date('2024-12-18'),
        message: 'Hi! I found you through our mutual friend Alice. Would love to connect!'
      },
      {
        id: 'req2',
        name: 'Jack Thompson',
        email: 'jack.thompson@email.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jack',
        requestDate: new Date('2024-12-19'),
        message: 'Hey, we met at the conference last week. Let\'s split some expenses!'
      }
    ];
  }

  // Statistics Methods
  getTotalFriends(): number {
    return this.friends.filter(f => f.status === 'active').length;
  }

  getActiveFriends(): number {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
    return this.friends.filter(f => 
      f.status === 'active' && f.lastActivity >= oneMonthAgo
    ).length;
  }

  getPendingRequests(): number {
    return this.friendRequests.length;
  }

  getSharedExpenses(): number {
    return this.friends.reduce((total, friend) => total + friend.sharedExpenses, 0);
  }

  // Search and Filter Methods
  filterFriends() {
    let filtered = [...this.friends];

    // Apply status filter
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(friend => friend.status === this.statusFilter);
    }

    // Apply search query
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(friend =>
        friend.name.toLowerCase().includes(query) ||
        friend.email.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (this.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'recent':
          return b.friendsSince.getTime() - a.friendsSince.getTime();
        case 'activity':
          return b.lastActivity.getTime() - a.lastActivity.getTime();
        default:
          return 0;
      }
    });

    this.filteredFriends = filtered;
  }

  // Filter Control Methods
  toggleStatusFilter() {
    this.showStatusFilter = !this.showStatusFilter;
    this.showSortFilter = false;
  }

  toggleSortFilter() {
    this.showSortFilter = !this.showSortFilter;
    this.showStatusFilter = false;
  }

  setStatusFilter(status: StatusFilter) {
    this.statusFilter = status;
    this.showStatusFilter = false;
    this.filterFriends();
  }

  setSortBy(sortBy: SortBy) {
    this.sortBy = sortBy;
    this.showSortFilter = false;
    this.filterFriends();
  }

  getStatusFilterLabel(): string {
    const labels = {
      all: 'All Friends',
      active: 'Active',
      pending: 'Pending',
      blocked: 'Blocked'
    };
    return labels[this.statusFilter];
  }

  getSortFilterLabel(): string {
    const labels = {
      name: 'Name (A-Z)',
      recent: 'Recently Added',
      activity: 'Most Active'
    };
    return labels[this.sortBy];
  }

  hasActiveFilters(): boolean {
    return this.searchQuery.trim() !== '' || this.statusFilter !== 'all';
  }

  clearAllFilters() {
    this.searchQuery = '';
    this.statusFilter = 'all';
    this.sortBy = 'name';
    this.filterFriends();
  }

  clearSearch() {
    this.searchQuery = '';
    this.filterFriends();
  }

  // Friend Request Methods
  getPendingFriendRequests(): FriendRequest[] {
    return this.friendRequests;
  }

  acceptFriendRequest(requestId: string) {
    const request = this.friendRequests.find(r => r.id === requestId);
    if (request) {
      // Add to friends list
      const newFriend: Friend = {
        id: `friend_${Date.now()}`,
        name: request.name,
        email: request.email,
        avatar: request.avatar,
        status: 'active',
        friendsSince: new Date(),
        lastActivity: new Date(),
        sharedExpenses: 0,
        totalOwed: 0,
        groups: []
      };
      
      this.friends.push(newFriend);
      
      // Remove from requests
      this.friendRequests = this.friendRequests.filter(r => r.id !== requestId);
      
      this.filterFriends();
      console.log('Accepted friend request from:', request.name);
    }
  }

  rejectFriendRequest(requestId: string) {
    const request = this.friendRequests.find(r => r.id === requestId);
    if (request) {
      this.friendRequests = this.friendRequests.filter(r => r.id !== requestId);
      console.log('Rejected friend request from:', request.name);
    }
  }

  // Friend Management Methods
  showFriendMenu(friendId: string) {
    this.selectedFriendId = friendId;
  }

  closeFriendMenu() {
    this.selectedFriendId = null;
  }

  getSelectedFriend(): Friend | undefined {
    return this.friends.find(f => f.id === this.selectedFriendId);
  }

  viewFriendProfile(friendId: string) {
    console.log('Viewing profile for friend:', friendId);
    this.closeFriendMenu();
    // Implementation for viewing friend profile
  }

  viewSharedExpenses(friendId: string) {
    console.log('Viewing shared expenses for friend:', friendId);
    this.closeFriendMenu();
    // Implementation for viewing shared expenses
  }

  settleUp(friendId: string) {
    console.log('Settling up with friend:', friendId);
    this.closeFriendMenu();
    // Implementation for settling up
  }

  sendReminder(friendId: string) {
    console.log('Sending reminder to friend:', friendId);
    this.closeFriendMenu();
    // Implementation for sending reminder
  }

  blockFriend(friendId: string) {
    const friend = this.friends.find(f => f.id === friendId);
    if (friend) {
      friend.status = 'blocked';
      this.filterFriends();
      this.closeFriendMenu();
      console.log('Blocked friend:', friend.name);
    }
  }

  removeFriend(friendId: string) {
    const friend = this.friends.find(f => f.id === friendId);
    if (friend && confirm(`Are you sure you want to remove ${friend.name} as a friend?`)) {
      this.friends = this.friends.filter(f => f.id !== friendId);
      this.filterFriends();
      this.closeFriendMenu();
      console.log('Removed friend:', friend.name);
    }
  }

  // Modal Methods
  showAddFriendModal() {
    console.log('Showing add friend modal');
    // Implementation for add friend modal
  }

  showInviteFriendsModal() {
    console.log('Showing invite friends modal');
    // Implementation for invite friends modal
  }

  viewFriendActivity() {
    console.log('Viewing friend activity');
    // Implementation for friend activity view
  }

  manageFriendGroups() {
    console.log('Managing friend groups');
    // Implementation for friend groups management
  }

  // Helper Methods
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  formatDate(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
      return 'Today';
    } else if (diffInDays === 1) {
      return 'Yesterday';
    } else if (diffInDays < 7) {
      return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
      const weeks = Math.floor(diffInDays / 7);
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (diffInDays < 365) {
      const months = Math.floor(diffInDays / 30);
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        year: 'numeric' 
      });
    }
  }

  getRelativeTime(date: Date): string {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return this.formatDate(date);
    }
  }

  getAbsoluteValue(value: number): number {
    return Math.abs(value);
  }
}
