import { Component, OnInit } from '@angular/core';
import { RecipePagination } from 'src/app/models/recipe';
import { RecipesService } from 'src/app/services/recipes.service';
import { UsersService } from 'src/app/services/users.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeFull } from 'src/app/models/recipe-full';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  createdRecipeId!: number;
  createdRecipe!: RecipeFull;
  createdRecipes!: RecipePagination;
  recipeForm!: FormGroup;
  recipeSubmitted: boolean = false;
  selectedFile: File | null = null;

  constructor(
    private usersService: UsersService,
    private recipesService: RecipesService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(225)]],
      instructions: ['', [Validators.required, Validators.maxLength(2000)]],
      imageUrl: [''],
      recipeIngredients: this.fb.array([
        this.fb.group({
          ingredientName: ['', Validators.required],
          unit: [''],
          amount: [0, Validators.required]
        })
      ])
    });

    this.createdRecipes = {
      totalCount: 0,
      pageSize: 0,
      currentPageNumber: 0,
      totalPages: 0,
      data: []
    }
  }
  get name() { return this.recipeForm.get('name'); }
  get description() { return this.recipeForm.get('description'); }
  get instructions() { return this.recipeForm.get('instructions'); }
  getIngredient(index: number) {
    return this.recipeIngredients.at(index).get('ingredientName');
  }
  get recipeIngredients() {
    return this.recipeForm.get('recipeIngredients') as FormArray;
  }

  submit() {
    if (this.recipeForm.valid) {
      if (this.selectedFile != null) {
        this.postImageAndRecipe();
      } else {
        this.postRecipeOnly();
      }
    }
  }

  postRecipeOnly() {
    this.usersService.postSharedRecipe(this.recipeForm)
      .subscribe((res: number) => {
        this.createdRecipeId = res;
        this.recipesService
          .getFullRecipeById(this.createdRecipeId)
          .subscribe((res: RecipeFull) => {
            this.createdRecipes.data.push(res)
            this.recipeSubmitted = true;
          });
      })
  }

  postImageAndRecipe() {
    const baseBlobUrl = 'https://recipesvaultimages.blob.core.windows.net/recipevaultimages/';
    const newFileName = this.generateNewFileName(this.selectedFile!.name.split('.').pop()!);

    const imgFormData = new FormData();
    imgFormData.append(newFileName, this.selectedFile!, newFileName);
    this.recipeForm.get('imageUrl')!.setValue(`${baseBlobUrl}${newFileName}`);

    this.usersService
      .upload(imgFormData)
      .subscribe(res => {
        this.usersService
          .postSharedRecipe(this.recipeForm)
          .subscribe((res: number) => {
            this.createdRecipeId = res;
            this.recipesService
              .getFullRecipeById(this.createdRecipeId)
              .subscribe((res: RecipeFull) => {
                this.createdRecipes.data.push(res)
                this.recipeSubmitted = true;
              });
          })
      })
  }

  onFileSelected(event: any) {
    const inputElement = event.target;

    if (inputElement.files.length === 0) {
      // No files selected, reset the selectedFile to null
      this.selectedFile = null;
    } else if (inputElement.files[0].size > 1024 * 1024 * 3) {
      alert("File size exceeds the maximum allowed size (3MB). Please choose a smaller file.");
      inputElement.value = null;
      this.selectedFile = null; // Also reset selectedFile
    } else {
      this.selectedFile = inputElement.files[0];
    }
  }

  addRecipeIngredient() {
    this.recipeIngredients.push(this.fb.group({
      ingredientName: [''],
      amount: [0],
      unit: ['']
    }));
  }

  deleteRecipeIngredient(index: number) {
    this.recipeIngredients.removeAt(index);
  }

  generateNewFileName(fileExtension: string) {
    const newFileName = crypto.randomUUID();
    return `${newFileName}.${fileExtension}`
  }
}
