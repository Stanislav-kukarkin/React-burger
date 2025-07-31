import { Selectors } from './selectors';

Cypress.Commands.add('getBunIngredient', () => {
	return cy.get(Selectors.ingredients.bun.ingredient);
});

Cypress.Commands.add('getMainIngredient', () => {
	return cy.get(Selectors.ingredients.main.ingredient);
});

Cypress.Commands.add('getSauceIngredient', () => {
	return cy.get(Selectors.ingredients.sauce.ingredient);
});

Cypress.Commands.add('getBunZone', () => {
	return cy.get(Selectors.dropZones.bun);
});

Cypress.Commands.add('getMainZone', () => {
	return cy.get(Selectors.dropZones.main);
});

Cypress.Commands.add('getIngredientInBunZone', () => {
	return cy.get(Selectors.ingredients.bun.constructorIngredient);
});

Cypress.Commands.add('getIngredientInMainZone', () => {
	return cy.get(Selectors.ingredients.main.constructorIngredient);
});

Cypress.Commands.add('getModal', () => {
	return cy.get(Selectors.modal.modal);
});

Cypress.Commands.add('openIngredientModal', (ingredientType) => {
	cy.get(`[data-cy="ingredient-item-${ingredientType}"]`).first().click();
	cy.get(Selectors.modal.modal).should('be.visible');
});
