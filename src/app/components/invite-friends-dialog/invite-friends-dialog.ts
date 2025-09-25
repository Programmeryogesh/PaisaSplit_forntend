import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

interface RecentInvite {
  id: string;
  email: string;
  sentDate: Date;
  status: 'pending' | 'accepted' | 'expired';
}

interface LinkSettings {
  expiresIn7Days: boolean;
  requireApproval: boolean;
}

interface InviteData {
  method: string;
  emails?: string[];
  contacts?: string[];
  message?: string;
  linkSettings?: LinkSettings;
  invitedCount: number;
}

@Component({
  selector: 'app-invite-friends-dialog',
  imports: [CommonModule, FormsModule],
  templateUrl: './invite-friends-dialog.html',
  styleUrl: './invite-friends-dialog.scss'
})
export class InviteFriendsDialog implements OnInit {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Output() friendsInvited = new EventEmitter<InviteData>();

  // Form data
  inviteMethod: string = '';
  newEmail: string = '';
  emailList: string[] = [];
  personalMessage: string = '';
  contactSearch: string = '';
  selectedContacts: string[] = [];

  // Link sharing
  inviteLink: string = 'https://paisasplit.com/invite/abc123xyz';
  linkCopied: boolean = false;
  linkSettings: LinkSettings = {
    expiresIn7Days: true,
    requireApproval: false
  };

  // Component state
  isLoading: boolean = false;
  errors: { [key: string]: string } = {};

  // Mock data
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  recentInvites: RecentInvite[] = [];

  ngOnInit(): void {
    this.loadMockData();
    this.generateInviteLink();
  }

  /**
   * Load mock data
   */
  loadMockData(): void {
    // Mock contacts data
    this.contacts = [
      { id: '1', name: 'John Smith', phone: '+1234567890', email: 'john@example.com' },
      { id: '2', name: 'Sarah Johnson', phone: '+1234567891', email: 'sarah@example.com' },
      { id: '3', name: 'Mike Chen', phone: '+1234567892', email: 'mike@example.com' },
      { id: '4', name: 'Emily Davis', phone: '+1234567893', email: 'emily@example.com' },
      { id: '5', name: 'David Wilson', phone: '+1234567894', email: 'david@example.com' },
      { id: '6', name: 'Lisa Brown', phone: '+1234567895', email: 'lisa@example.com' },
      { id: '7', name: 'Tom Anderson', phone: '+1234567896', email: 'tom@example.com' },
      { id: '8', name: 'Amy Taylor', phone: '+1234567897', email: 'amy@example.com' }
    ];

    this.filteredContacts = [...this.contacts];

    // Mock recent invites
    this.recentInvites = [
      {
        id: '1',
        email: 'alex@example.com',
        sentDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        status: 'pending'
      },
      {
        id: '2',
        email: 'jane@example.com',
        sentDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        status: 'accepted'
      },
      {
        id: '3',
        email: 'bob@example.com',
        sentDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        status: 'expired'
      }
    ];
  }

  /**
   * Generate invite link
   */
  generateInviteLink(): void {
    const randomId = Math.random().toString(36).substr(2, 12);
    this.inviteLink = `https://paisasplit.com/invite/${randomId}`;
  }

  /**
   * Add email to the list
   */
  addEmail(): void {
    const email = this.newEmail.trim().toLowerCase();
    
    if (!email) {
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.errors['newEmail'] = 'Please enter a valid email address';
      return;
    }

    // Check for current user's email
    const currentUserEmail = this.getCurrentUserEmail().toLowerCase();
    if (email === currentUserEmail) {
      this.errors['newEmail'] = "You can't invite yourself";
      return;
    }

    // Check for duplicate emails
    if (this.emailList.includes(email)) {
      this.errors['newEmail'] = 'This email is already in the list';
      return;
    }

    // Add email
    this.emailList.push(email);
    this.newEmail = '';
    delete this.errors['newEmail'];
  }

  /**
   * Remove email from the list
   */
  removeEmail(index: number): void {
    this.emailList.splice(index, 1);
  }

  /**
   * Get initials from name or email
   */
  getInitials(nameOrEmail: string): string {
    if (!nameOrEmail) return '?';
    
    if (nameOrEmail.includes('@')) {
      const username = nameOrEmail.split('@')[0];
      return username.substring(0, 2).toUpperCase();
    } else {
      const parts = nameOrEmail.trim().split(' ');
      if (parts.length >= 2) {
        return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
      }
      return nameOrEmail.substring(0, 2).toUpperCase();
    }
  }

  /**
   * Get email initials
   */
  getEmailInitials(email: string): string {
    return this.getInitials(email);
  }

  /**
   * Get current user name
   */
  getCurrentUserName(): string {
    return 'You'; // Mock current user
  }

  /**
   * Get current user email
   */
  getCurrentUserEmail(): string {
    return 'you@example.com'; // Mock current user
  }

  /**
   * Copy invite link to clipboard
   */
  copyLink(): void {
    navigator.clipboard.writeText(this.inviteLink).then(() => {
      this.linkCopied = true;
      setTimeout(() => {
        this.linkCopied = false;
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy link:', err);
    });
  }

  /**
   * Share via WhatsApp
   */
  shareViaWhatsApp(): void {
    const message = `Join me on PaisaSplit to easily split expenses! ${this.inviteLink}`;
    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  /**
   * Share via Telegram
   */
  shareViaTelegram(): void {
    const message = `Join me on PaisaSplit to easily split expenses! ${this.inviteLink}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent(this.inviteLink)}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  /**
   * Share via Facebook
   */
  shareViaFacebook(): void {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(this.inviteLink)}`;
    window.open(url, '_blank');
  }

  /**
   * Share via Twitter
   */
  shareViaTwitter(): void {
    const message = `Join me on PaisaSplit to easily split expenses! ${this.inviteLink}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  /**
   * Generic share (Web Share API)
   */
  shareGeneric(): void {
    if (navigator.share) {
      navigator.share({
        title: 'Join PaisaSplit',
        text: 'Join me on PaisaSplit to easily split expenses!',
        url: this.inviteLink
      });
    } else {
      this.copyLink();
    }
  }

  /**
   * Filter contacts based on search
   */
  filterContacts(): void {
    const search = this.contactSearch.toLowerCase();
    if (!search) {
      this.filteredContacts = [...this.contacts];
    } else {
      this.filteredContacts = this.contacts.filter(contact =>
        contact.name.toLowerCase().includes(search) ||
        contact.phone.includes(search) ||
        (contact.email && contact.email.toLowerCase().includes(search))
      );
    }
  }

  /**
   * Toggle contact selection
   */
  toggleContact(contact: Contact): void {
    const index = this.selectedContacts.indexOf(contact.id);
    if (index > -1) {
      this.selectedContacts.splice(index, 1);
    } else {
      this.selectedContacts.push(contact.id);
    }
  }

  /**
   * Format date for display
   */
  formatDate(date: Date): string {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'today';
    if (diffInDays === 1) return 'yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }

  /**
   * Get status text
   */
  getStatusText(status: string): string {
    switch (status) {
      case 'pending': return 'Pending';
      case 'accepted': return 'Joined';
      case 'expired': return 'Expired';
      default: return status;
    }
  }

  /**
   * Resend invite
   */
  resendInvite(invite: RecentInvite): void {
    console.log('Resending invite to:', invite.email);
    // Simulate resend
    invite.sentDate = new Date();
    invite.status = 'pending';
  }

  /**
   * Check if can send invitations
   */
  canSendInvitations(): boolean {
    switch (this.inviteMethod) {
      case 'email':
        return this.emailList.length > 0;
      case 'link':
        return true;
      case 'contacts':
        return this.selectedContacts.length > 0;
      default:
        return false;
    }
  }

  /**
   * Send invitations
   */
  sendInvitations(): void {
    if (!this.canSendInvitations()) {
      return;
    }

    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      let invitedCount = 0;
      const inviteData: InviteData = {
        method: this.inviteMethod,
        invitedCount: 0
      };

      switch (this.inviteMethod) {
        case 'email':
          inviteData.emails = [...this.emailList];
          inviteData.message = this.personalMessage;
          invitedCount = this.emailList.length;
          break;
        
        case 'link':
          this.generateInviteLink();
          inviteData.linkSettings = { ...this.linkSettings };
          invitedCount = 1; // Link generated
          break;
        
        case 'contacts':
          inviteData.contacts = [...this.selectedContacts];
          invitedCount = this.selectedContacts.length;
          break;
      }

      inviteData.invitedCount = invitedCount;
      this.friendsInvited.emit(inviteData);
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
    this.inviteMethod = '';
    this.newEmail = '';
    this.emailList = [];
    this.personalMessage = '';
    this.contactSearch = '';
    this.selectedContacts = [];
    this.linkCopied = false;
    this.linkSettings = {
      expiresIn7Days: true,
      requireApproval: false
    };
    this.errors = {};
    this.isLoading = false;
    this.filteredContacts = [...this.contacts];
  }

  /**
   * Handle invite method change
   */
  onInviteMethodChange(): void {
    // Reset method-specific data
    this.emailList = [];
    this.selectedContacts = [];
    this.contactSearch = '';
    this.errors = {};
    this.filteredContacts = [...this.contacts];
  }
}