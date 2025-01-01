import { Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
  @Input() totalCount!: number;
  @Input() pageSize!: number;
  @Input() totalPages!: number;
  @Input() itemsPerPageOptions: number[] = [8, 16, 24, 32];
  @Input() currentPageNumber: number = 1;
  @Input() itemsPerPage: number = 8;
  @Output() pageChange = new EventEmitter<number>();
  @Output() itemsPerPageChange = new EventEmitter<number>();

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPageNumber = newPage;
      this.pageChange.emit(this.currentPageNumber);
    }
  }
  
  changeItemsPerPage() {
    this.itemsPerPageChange.emit(this.itemsPerPage);
    this.currentPageNumber = 1;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
