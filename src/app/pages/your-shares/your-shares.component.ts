import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/app/models/recipe';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-your-shares',
  templateUrl: './your-shares.component.html',
  styleUrls: ['./your-shares.component.scss']
})
export class YourSharesComponent implements OnInit {
  recipes$!: Observable<Recipe[]>;
  headerTitle!: string;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadData();
    this.headerTitle = "Your Shares"
  }

  loadData() {
    this.recipes$ = this.usersService.getUserCreatedRecipes();
  }
}
