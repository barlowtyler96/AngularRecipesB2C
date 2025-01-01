import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';
import { Ingredient } from 'src/app/models/ingredient';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-full-recipe',
  templateUrl: './full-recipe.component.html',
  styleUrls: ['./full-recipe.component.scss']
})
export class FullRecipeComponent {
  private modal!: Modal;
  @Input() fullRecipe?: Recipe;
  @Input() ingredientArray1: Ingredient[] = [];
  @Input() ingredientArray2: Ingredient[] = [];
  @ViewChild('modalElement') modalElement!: ElementRef;

  openModal() {
    if (!this.modal) {
      this.modal = new Modal(this.modalElement.nativeElement);
    }
    this.modal.show();
  }

  closeModal() {
    this.modal?.hide();
  }
}
