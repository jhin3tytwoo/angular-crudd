// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';  // นำเข้าคอมโพเนนต์ UserListComponent

export const routes: Routes = [
  { path: '', component: UserListComponent },  // เปลี่ยนให้หน้าแรกเป็น UserListComponent
  { path: 'user-detail/:id', component: UserDetailComponent },  // เส้นทางสำหรับหน้าแสดงรายละเอียดผู้ใช้
];
