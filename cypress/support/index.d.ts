declare namespace Cypress {
	interface Chainable {
		getBunIngredient(): Chainable<JQuery<HTMLElement>>;
		getMainIngredient(): Chainable<JQuery<HTMLElement>>;
		getSauceIngredient(): Chainable<JQuery<HTMLElement>>;
		getIngredientInBunZone(): Chainable<JQuery<HTMLElement>>;
		getIngredientInMainZone(): Chainable<JQuery<HTMLElement>>;
		getModal(): Chainable<JQuery<HTMLElement>>;
		getSauceIngredient(): Chainable<JQuery<HTMLElement>>;
		getBunZone(): Chainable<JQuery<HTMLElement>>;
		getMainZone(): Chainable<JQuery<HTMLElement>>;
		openIngredientModal(ingredientType: string): Chainable<void>;
		dragIngredientToBunZone(): Chainable<void>;
		dragIngredientToMainZone(): Chainable<void>;
	}
}
