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
    }
    ShareComponent.prototype.ngOnInit = function () {
        this.recipeForm = this.fb.group({
            name: ['', forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            instructions: ['', forms_1.Validators.required],
            imageUrl: [''],
            recipeIngredients: this.fb.array([
                this.fb.group({
                    ingredientName: ['', forms_1.Validators.required],
                    unit: ['', forms_1.Validators.required],
                    amount: [0, forms_1.Validators.required]
                })
            ])
        });
    };
    Object.defineProperty(ShareComponent.prototype, "recipeIngredients", {
        get: function () {
            return this.recipeForm.get('recipeIngredients');
        },
        enumerable: false,
        configurable: true
    });
    ShareComponent.prototype.addRecipeIngredient = function () {
        this.recipeIngredients.push(this.fb.control({
            ingredientName: [''],
            amount: [0],
            unit: ['']
        }));
    };
    ShareComponent.prototype.deleteRecipeIngredient = function (index) {
        this.recipeIngredients.removeAt(index);
    };
    ShareComponent.prototype.submit = function () {
        if (this.recipeForm.valid) {
            var baseBlobUrl = 'https://recipesvaultimages.blob.core.windows.net/recipevaultimages/';
            var timestamp = new Date().getTime();
            var randomString = Math.random().toString(36).substring(7);
            // Handle form submission here
            var formData = this.recipeForm.value;
            var newFileName = timestamp + "_" + randomString + "_" + this.selectedFile.name;
            var imgFormData = new FormData();
            imgFormData.append('image', this.selectedFile, newFileName);
            formData.append('imageUrl', this.selectedFile, newFileName);
            //pass new file name to backend, set new file name to recipe
            this.usersService.upload(imgFormData)
                .subscribe(function (res) {
            });
            this.usersService.postSharedRecipe(formData);
        }
        else {
            // Handle form validation errors
        }
    };
    ShareComponent.prototype.onFileSelected = function (event) {
        if (event.target.files[0].size > 1024 * 1024 * 3) {
            alert("File size exceeds the maximum allowed size (1MB). Please choose a smaller file.");
            event.target.value = null;
        }
        else {
            this.selectedFile = event.target.files[0];
        }
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
