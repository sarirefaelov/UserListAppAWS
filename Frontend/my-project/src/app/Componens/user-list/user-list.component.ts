import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;
  
  // Form
  showForm = false;
  formName = '';
  editingUser: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
    
  }

  // Load users
  loadUsers() {
    this.loading = true;
    this.error = null;
    
    this.userService.getUsers().subscribe({
      next: data => {
        this.users = data;
        console.log('✅ Users loaded successfully:', this.users);
        this.loading = false;
      },
      error: err => {
        console.error('❌ Error loading users:', err);
        this.error = 'Error loading users. Please try again.';
        this.loading = false;
      }
    });
  }

  // Open add form
  openAddUserForm() {
    this.showForm = true;
    this.editingUser = null;
    this.formName = '';
    this.error = null;
    this.successMessage = null;
  }

  // Open edit form
  openEditUserForm(user: User) {
    this.showForm = true;
    this.editingUser = user;
    this.formName = user.name;
    this.error = null;
    this.successMessage = null;
  }

  // Cancel form
  cancelForm() {
    this.showForm = false;
    this.editingUser = null;
    this.formName = '';
  }

  // Save user (add or edit)
  saveUser() {
    const name = this.formName.trim();
    
    if (!name) {
      this.error = 'Please enter a username';
      return;
    }

    if (this.editingUser) {
      // Edit
      this.updateUser(this.editingUser.id, name);
    } else {
      // Add
      this.addUser(name);
    }
  }

  // Add new user
  addUser(name: string) {
    const newUser: User = { id: 0, name: name };
    
    this.userService.addUser(newUser).subscribe({
      next: user => {
        console.log('✅ User added:', user);
        this.successMessage = `User "${user.name}" added successfully!`;
        this.cancelForm();
        this.loadUsers(); 
        
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: err => {
        console.error('❌ Error adding user:', err);
        this.error = 'Error adding user. Please try again.';
      }
    });
  }

  // Update existing user
  updateUser(id: number, name: string) {
    const updatedUser: User = { id: id, name: name };
    
    this.userService.updateUser(id, updatedUser).subscribe({
      next: user => {
        console.log('✅ User updated:', user);
        this.successMessage = `User updated to "${user.name}" successfully!`;
        this.cancelForm();
        this.loadUsers(); 
        
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: err => {
        console.error('❌ Error updating user:', err);
        this.error = 'Error updating user. Please try again.';
      }
    });
  }

  // Delete user with confirmation
  deleteUserConfirm(user: User) {
    const confirmed = confirm(`Are you sure you want to delete user "${user.name}"?`);
    
    if (!confirmed) {
      return;
    }

    this.deleteUser(user);
  }

  // Delete user
  deleteUser(user: User) {
    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        console.log('✅ User deleted:', user.id);
        this.successMessage = `User "${user.name}" deleted successfully!`;
        this.loadUsers(); 
        
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: err => {
        console.error('❌ Error deleting user:', err);
        this.error = 'Error deleting user. Please try again.';
      }
    });
  }
}