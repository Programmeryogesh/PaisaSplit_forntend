import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Member {
  id: string;
  name?: string;
  email: string;
  isInvited: boolean;
}

interface GroupType {
  value: string;
  title: string;
  description: string;
  icon: string;
}

interface GroupSettings {
  allowMembersToAddExpenses: boolean;
  allowMembersToInviteOthers: boolean;
  notifyOnNewExpenses: boolean;
}

interface GroupData {
  name: string;
  icon: string;
  type: string;
  description: string;
  members: Member[];
  settings: GroupSettings;
}

@Component({
  selector: 'app-create-group-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-group-dialog.html',
  styleUrl: './create-group-dialog.scss'
})
export class CreateGroupDialog implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() groupCreated = new EventEmitter<GroupData>();

  // Form data
  groupName: string = '';
  selectedIcon: string = '👥';
  groupType: string = 'general';
  groupDescription: string = '';
  newMemberEmail: string = '';
  members: Member[] = [];
  settings: GroupSettings = {
    allowMembersToAddExpenses: true,
    allowMembersToInviteOthers: false,
    notifyOnNewExpenses: true
  };

  // Component state
  isLoading: boolean = false;
  errors: { [key: string]: string } = {};

  // Available options
  availableIcons: string[] = [
    '👥', '🏠', '🎓', '💼', '✈️', '🍽️', '🎉', '⚽', 
    '🎬', '🎵', '📚', '💰', '🛒', '🏋️', '🌍', '❤️'
  ];

  groupTypes: GroupType[] = [
    {
      value: 'general',
      title: 'General',
      description: 'For everyday shared expenses',
      icon: '👥'
    },
    {
      value: 'home',
      title: 'Home',
      description: 'Roommates, family, household expenses',
      icon: '🏠'
    },
    {
      value: 'friends',
      title: 'Friends',
      description: 'Friend groups, social activities',
      icon: '🎉'
    },
    {
      value: 'trip',
      title: 'Trip',
      description: 'Travel and vacation expenses',
      icon: '✈️'
    },
    {
      value: 'work',
      title: 'Work',
      description: 'Office colleagues, work events',
      icon: '💼'
    },
    {
      value: 'other',
      title: 'Other',
      description: 'Custom group type',
      icon: '📝'
    }
  ];

  ngOnInit(): void {
    this.resetForm();
  }

  /**
   * Select icon for the group
   */
  selectIcon(icon: string): void {
    this.selectedIcon = icon;
  }

  /**
   * Add member to the group
   */
  addMember(): void {
    const email = this.newMemberEmail.trim().toLowerCase();
    
    if (!email) {
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.errors['newMemberEmail'] = 'Please enter a valid email address';
      return;
    }

    // Check for current user's email
    const currentUserEmail = this.getCurrentUserEmail().toLowerCase();
    if (email === currentUserEmail) {
      this.errors['newMemberEmail'] = "You can't add yourself to the group";
      return;
    }

    // Check for duplicate emails
    if (this.members.some(member => member.email.toLowerCase() === email)) {
      this.errors['newMemberEmail'] = 'This person is already in the group';
      return;
    }

    // Add member
    const newMember: Member = {
      id: Math.random().toString(36).substr(2, 9),
      email: email,
      isInvited: false
    };

    this.members.push(newMember);
    this.newMemberEmail = '';
    delete this.errors['newMemberEmail'];
  }

  /**
   * Remove member from the group
   */
  removeMember(index: number): void {
    this.members.splice(index, 1);
  }

  /**
   * Get initials from name or email
   */
  getInitials(nameOrEmail: string): string {
    if (!nameOrEmail) return '?';
    
    if (nameOrEmail.includes('@')) {
      // It's an email, get initials from the part before @
      const username = nameOrEmail.split('@')[0];
      return username.substring(0, 2).toUpperCase();
    } else {
      // It's a name, get first letters of first and last name
      const parts = nameOrEmail.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
      }
      return nameOrEmail.substring(0, 2).toUpperCase();
    }
  }

  /**
   * Get current user's initials
   */
  getCurrentUserInitials(): string {
    // Mock current user - in real app, this would come from auth service
    return 'YO'; // Your initials
  }

  /**
   * Get current user's email
   */
  getCurrentUserEmail(): string {
    // Mock current user - in real app, this would come from auth service
    return 'you@example.com';
  }

  /**
   * Validate form data
   */
  validateForm(): boolean {
    this.errors = {};
    let isValid = true;

    if (!this.groupName.trim()) {
      this.errors['groupName'] = 'Please enter a group name';
      isValid = false;
    } else if (this.groupName.trim().length < 2) {
      this.errors['groupName'] = 'Group name must be at least 2 characters';
      isValid = false;
    }

    if (!this.groupType) {
      this.errors['groupType'] = 'Please select a group type';
      isValid = false;
    }

    return isValid;
  }

  /**
   * Check if form is valid
   */
  isFormValid(): boolean {
    return !!(
      this.groupName.trim().length >= 2 &&
      this.groupType &&
      this.selectedIcon
    );
  }

  /**
   * Create the group
   */
  createGroup(): void {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      const groupData: GroupData = {
        name: this.groupName.trim(),
        icon: this.selectedIcon,
        type: this.groupType,
        description: this.groupDescription.trim(),
        members: this.members,
        settings: { ...this.settings }
      };

      this.groupCreated.emit(groupData);
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
    this.groupName = '';
    this.selectedIcon = '👥';
    this.groupType = 'general';
    this.groupDescription = '';
    this.newMemberEmail = '';
    this.members = [];
    this.settings = {
      allowMembersToAddExpenses: true,
      allowMembersToInviteOthers: false,
      notifyOnNewExpenses: true
    };
    this.errors = {};
    this.isLoading = false;
  }

  /**
   * Handle member email input change
   */
  onMemberEmailChange(): void {
    delete this.errors['newMemberEmail'];
  }

  /**
   * Handle group name input change
   */
  onGroupNameChange(): void {
    delete this.errors['groupName'];
  }

  /**
   * Get group type title by value
   */
  getGroupTypeTitle(value: string): string {
    const type = this.groupTypes.find(t => t.value === value);
    return type ? type.title : value;
  }

  /**
   * Get suggested group icon based on type
   */
  getSuggestedIcon(): string {
    const type = this.groupTypes.find(t => t.value === this.groupType);
    return type ? type.icon : '👥';
  }

  /**
   * Auto-select icon based on group type
   */
  onGroupTypeChange(): void {
    if (this.selectedIcon === '👥' || !this.selectedIcon) {
      this.selectedIcon = this.getSuggestedIcon();
    }
  }
}