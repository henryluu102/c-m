
export interface Ingredient {
  name: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: 'Món Kho' | 'Món Canh' | 'Món Xào' | 'Món Chiên' | 'Món Nộm' | 'Tráng Miệng';
  prepTime: string;
  cookTime: string;
  difficulty: 'Dễ' | 'Trung Bình' | 'Khó';
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
  imageUrl: string;
  nutrition?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export interface MealPlan {
  day: string;
  lunch: Recipe[];
  dinner: Recipe[];
}

export enum AppSection {
  HOME = 'home',
  EXPLORE = 'explore',
  PLANNER = 'planner',
  ASSISTANT = 'assistant'
}
