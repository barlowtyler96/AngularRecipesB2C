import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe, RecipePagination } from 'src/app/models/recipe';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-your-shares',
  templateUrl: './your-shares.component.html',
  styleUrls: ['./your-shares.component.scss']
})
export class YourSharesComponent implements OnInit {
  recipePagination$!: Observable<RecipePagination>;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  headerTitle!: string;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.loadData(1);
    this.headerTitle = "Your Shares"
  }

  loadData(page: number) {
    this.recipePagination$ = this.usersService.getUserCreatedRecipes(this.currentPage, this.itemsPerPage);
  }

  onItemsPerPageChange(newItemsPerPage: number) {
    this.itemsPerPage = newItemsPerPage;
    this.loadData(1);
  }
}
