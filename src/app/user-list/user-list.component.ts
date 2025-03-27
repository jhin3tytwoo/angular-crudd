// src/app/user-list/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';  // ปรับเส้นทางการนำเข้า
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user-list',  // ตั้งชื่อ selector ให้ถูกต้อง
  templateUrl: './user-list.component.html',  // ใช้ไฟล์ template ของ user-list
  styleUrls: ['./user-list.component.css'],  // ใช้ไฟล์สไตล์ของ user-list
  standalone: true,  // ทำให้เป็น Standalone Component
  imports: [CommonModule, FormsModule, RouterModule],  // นำเข้าโมดูลที่ต้องใช้
})
export class UserListComponent implements OnInit {
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
