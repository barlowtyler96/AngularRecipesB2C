import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeCardsComponent } from './recipe-cards.component';

describe('RecipeCardsComponent', () => {
  let component: RecipeCardsComponent;
  let fixture: ComponentFixture<RecipeCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipeCardsComponent]
    });
    fixture = TestBed.createComponent(RecipeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
