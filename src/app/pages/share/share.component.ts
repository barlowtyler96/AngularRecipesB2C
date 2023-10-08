import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { RecipePagination } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { UsersService } from 'src/app/services/users.service';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  createdRecipeId!: number;
  createdRecipes$!: Observable<RecipePagination>;
  recipeForm!: FormGroup;
  selectedFile!: File;

  constructor(private usersService: UsersService, private recipesService: RecipesService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      instructions: ['', Validators.required],
      imageUrl: [''],
      recipeIngredients: this.fb.array([
        this.fb.group({
          ingredientName: ['', Validators.required],
          unit: ['', Validators.required],
          amount: [0 , Validators.required]
        })
      ])
    });
  }

  get recipeIngredients() {
    return this.recipeForm.get('recipeIngredients') as FormArray;
  }

  addRecipeIngredient() {
    this.recipeIngredients.push(this.fb.control({
          ingredientName: [''],
          amount: [0],
          unit: ['']
        }));
  }

  deleteRecipeIngredient(index: number) {
    this.recipeIngredients.removeAt(index);
  }

  submit() {
    if (this.recipeForm.valid) {
      const baseBlobUrl = 'https://recipesvaultimages.blob.core.windows.net/recipevaultimages/';
      const timestamp = new Date().getTime();
      const randomString = Math.random().toString(36).substring(7);

      // Handle form submission here
      const formData = this.recipeForm.value;
      const newFileName = `${timestamp}_${randomString}_${this.selectedFile.name}`
      const imgFormData = new FormData();

      imgFormData.append('image', this.selectedFile, newFileName);
      formData.append('imageUrl', this.selectedFile, newFileName);
      //pass new file name to backend, set new file name to recipe
      this.usersService.upload(imgFormData)
        .subscribe(res => {
          
        })
      
      this.usersService.postSharedRecipe(formData);
    } else {
      // Handle form validation errors
    }
  }

  onFileSelected(event: any) {
    if(event.target.files[0].size > 1024 * 1024 * 3) {
      alert("File size exceeds the maximum allowed size (1MB). Please choose a smaller file.");
      event.target.value = null;
    } else {
      this.selectedFile = <File>event.target.files[0];
    }
  }
}
