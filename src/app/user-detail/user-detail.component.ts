import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class UserDetailComponent implements OnInit {
  userId!: number;  // ใช้เครื่องหมาย ! เพื่อบอกว่า userId จะได้รับค่าใน ngOnInit
  userDetails: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!;
    this.loadUserDetails();
  }

  loadUserDetails() {
    this.userService.getUserById(this.userId).subscribe(
      (data) => {
        this.userDetails = data;
      },
      (error) => {
        console.error('Error loading user details:', error);
      }
    );
  }
}
