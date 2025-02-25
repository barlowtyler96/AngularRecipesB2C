import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipes.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe, RecipePagination } from 'src/app/models/recipe';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  createdRecipe!: Recipe;
  recipeForm!: FormGroup;
  recipeSubmitted: boolean = false;
  selectedFile: File | null = null;
  headerTitle!: string;
  constructor(
    private recipesService: RecipesService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.headerTitle = "Share"
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(225)]],
      instructions: ['', [Validators.required, Validators.maxLength(2000)]],
      imageUrl: [''],
      ingredients: this.fb.array([
        this.fb.group({
          name: ['', Validators.required],
          unit: [''],
          amount: [0, Validators.required]
        })
      ])
    });
  }

  get name() { return this.recipeForm.get('name'); }
  get description() { return this.recipeForm.get('description'); }
  get instructions() { return this.recipeForm.get('instructions'); }
  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  getIngredient(index: number) {
    return this.ingredients.at(index).get('name');
  }

  submit() {
    if (this.recipeForm.valid) {
      this.postImageAndRecipe();
  }
}

  postImageAndRecipe() {
    const baseBlobUrl = 'https://recipesvaultimages.blob.core.windows.net/recipevaultimages/';
    const newFileName = this.generateNewFileName(this.selectedFile!.name.split('.').pop()!);

    const imgFormData = new FormData();
    imgFormData.append(newFileName, this.selectedFile!, newFileName);
    this.recipeForm.get('imageUrl')!.setValue(`${baseBlobUrl}${newFileName}`);

    this.recipesService
      .upload(imgFormData)
      .subscribe(res => {
        this.recipesService
          .postSharedRecipe(this.recipeForm)
          .subscribe((res: Recipe) => {
            this.recipeSubmitted = true;
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

  addIngredient() {
    this.ingredients.push(this.fb.group({
      name: [''],
      amount: [0],
      unit: ['']
    }));
  }

  deleteIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  generateNewFileName(fileExtension: string) {
    const newFileName = crypto.randomUUID();
    return `${newFileName}.${fileExtension}`
  }
}
