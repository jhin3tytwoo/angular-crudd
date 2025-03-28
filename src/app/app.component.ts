import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { RouterModule, Router } from '@angular/router';  // นำเข้า RouterModule และ Router

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,  // ทำให้เป็น Standalone Component
  imports: [CommonModule, FormsModule, RouterModule],  // เพิ่มการนำเข้า RouterModule
})
export class AppComponent implements OnInit {
  users: any[] = [];
  newUser = { name: '', email: '', age: '' }; // เก็บค่าฟอร์ม
  editingUser: any = null; // เก็บข้อมูลของผู้ใช้ที่กำลังแก้ไข

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  addUser() {
    if (this.newUser.name && this.newUser.email && this.newUser.age) {
      this.userService.addUser(this.newUser).subscribe(() => {
        this.loadUsers();
        this.newUser = { name: '', email: '', age: '' }; // เคลียร์ฟอร์ม
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

  editUser(user: any) {
    this.editingUser = { ...user };
  }

  updateUser() {
    if (this.editingUser && this.editingUser.name && this.editingUser.email && this.editingUser.age) {
      this.userService.updateUser(this.editingUser.id, this.editingUser).subscribe(() => {
        this.loadUsers();
        this.editingUser = null;
      });
    } else {
      alert('Please fill in all fields.');
    }
  }

  viewDetail(userId: number) {
    this.router.navigate(['/user-detail', userId]);  // ใช้ router.navigate() ในการนำทางไปยังหน้าแสดงรายละเอียดผู้ใช้
  }
}
