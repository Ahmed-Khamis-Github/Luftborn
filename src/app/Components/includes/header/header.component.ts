import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name: string | null = null;

  constructor(private router: Router,
  ) { }

  ngOnInit(): void {
    this.name = localStorage.getItem('name');
  }

  logout() {
    localStorage.removeItem('token') ;
    this.router.navigate(['/login'])
  }
}
