"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShareComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ShareComponent = /** @class */ (function () {
    function ShareComponent(usersService, recipesService, fb) {
        this.usersService = usersService;
        this.recipesService = recipesService;
        this.fb = fb;
        this.recipeSubmitted = false;
        this.selectedFile = null;
    }
    ShareComponent.prototype.ngOnInit = function () {
        this.headerTitle = "Share";
        this.recipeForm = this.fb.group({
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(100)]],
            description: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(225)]],
            instructions: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(2000)]],
            imageUrl: [''],
            recipeIngredients: this.fb.array([
                this.fb.group({
                    ingredientName: ['', forms_1.Validators.required],
                    unit: [''],
                    amount: [0, forms_1.Validators.required]
                })
            ])
        });
        this.createdRecipes = {
            totalCount: 0,
            pageSize: 0,
            currentPageNumber: 0,
            totalPages: 0,
            data: []
        };
    };
    Object.defineProperty(ShareComponent.prototype, "name", {
        get: function () { return this.recipeForm.get('name'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShareComponent.prototype, "description", {
        get: function () { return this.recipeForm.get('description'); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ShareComponent.prototype, "instructions", {
        get: function () { return this.recipeForm.get('instructions'); },
        enumerable: false,
        configurable: true
    });
    ShareComponent.prototype.getIngredient = function (index) {
        return this.recipeIngredients.at(index).get('ingredientName');
    };
    Object.defineProperty(ShareComponent.prototype, "recipeIngredients", {
        get: function () {
            return this.recipeForm.get('recipeIngredients');
        },
        enumerable: false,
        configurable: true
    });
    ShareComponent.prototype.submit = function () {
        if (this.recipeForm.valid) {
            if (this.selectedFile != null) {
                this.postImageAndRecipe();
            }
            else {
                this.postRecipeOnly();
            }
        }
    };
    ShareComponent.prototype.postRecipeOnly = function () {
        var _this = this;
        this.usersService.postSharedRecipe(this.recipeForm)
            .subscribe(function (res) {
            _this.createdRecipeId = res;
            _this.recipesService
                .getFullRecipeById(_this.createdRecipeId)
                .subscribe(function (res) {
                _this.createdRecipes.data.push(res);
                _this.recipeSubmitted = true;
            });
        });
    };
    ShareComponent.prototype.postImageAndRecipe = function () {
        var _this = this;
        var baseBlobUrl = 'https://recipesvaultimages.blob.core.windows.net/recipevaultimages/';
        var newFileName = this.generateNewFileName(this.selectedFile.name.split('.').pop());
        var imgFormData = new FormData();
        imgFormData.append(newFileName, this.selectedFile, newFileName);
        this.recipeForm.get('imageUrl').setValue("" + baseBlobUrl + newFileName);
        this.recipesService
            .upload(imgFormData)
            .subscribe(function (res) {
            _this.usersService
                .postSharedRecipe(_this.recipeForm)
                .subscribe(function (res) {
                _this.createdRecipeId = res;
                _this.recipesService
                    .getFullRecipeById(_this.createdRecipeId)
                    .subscribe(function (res) {
                    _this.createdRecipes.data.push(res);
                    _this.recipeSubmitted = true;
                });
            });
        });
    };
    ShareComponent.prototype.onFileSelected = function (event) {
        var inputElement = event.target;
        if (inputElement.files.length === 0) {
            // No files selected, reset the selectedFile to null
            this.selectedFile = null;
        }
        else if (inputElement.files[0].size > 1024 * 1024 * 3) {
            alert("File size exceeds the maximum allowed size (3MB). Please choose a smaller file.");
            inputElement.value = null;
            this.selectedFile = null; // Also reset selectedFile
        }
        else {
            this.selectedFile = inputElement.files[0];
        }
    };
    ShareComponent.prototype.addRecipeIngredient = function () {
        this.recipeIngredients.push(this.fb.group({
            ingredientName: [''],
            amount: [0],
            unit: ['']
        }));
    };
    ShareComponent.prototype.deleteRecipeIngredient = function (index) {
        this.recipeIngredients.removeAt(index);
    };
    ShareComponent.prototype.generateNewFileName = function (fileExtension) {
        var newFileName = crypto.randomUUID();
        return newFileName + "." + fileExtension;
    };
    ShareComponent = __decorate([
        core_1.Component({
            selector: 'app-share',
            templateUrl: './share.component.html',
            styleUrls: ['./share.component.scss']
        })
    ], ShareComponent);
    return ShareComponent;
}());
exports.ShareComponent = ShareComponent;
