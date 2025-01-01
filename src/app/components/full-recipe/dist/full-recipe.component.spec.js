"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var full_recipe_component_1 = require("./full-recipe.component");
describe('FullRecipeComponent', function () {
    var component;
    var fixture;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [full_recipe_component_1.FullRecipeComponent]
        });
        fixture = testing_1.TestBed.createComponent(full_recipe_component_1.FullRecipeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
