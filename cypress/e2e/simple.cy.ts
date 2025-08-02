/// <reference types="cypress" />

import { Selectors } from '../support/selectors';

describe('template spec', () => {
	beforeEach(() => {
		cy.fixture('ingredients.json').then((ingredients) => {
			cy.intercept('GET', '/api/ingredients', {
				statusCode: 200,
				body: { data: ingredients },
			}).as('getIngredients');
		});

		cy.window().then((win) => {
			win.localStorage.setItem('refreshToken', 'valid-refresh-token');
			win.localStorage.setItem('accessToken', 'valid-access-token');
		});

		cy.visit('/');
	});

	afterEach(() => {
		cy.window().then((win) => {
			win.localStorage.removeItem('refreshToken');
			win.localStorage.removeItem('accessToken');
		});
	});

	it('should load ingredients and display them', () => {
		cy.wait('@getIngredients');

		cy.getBunIngredient().should('exist');
		cy.getMainIngredient().should('exist');
		cy.getSauceIngredient().should('exist');
	});

	it('should display empty state when no ingredients are in the constructor', () => {
		cy.getBunZone().should('contain', 'Перетащите булку (вверх)');
		cy.getMainZone().should('contain', 'Перетащите начинки и соусы');
	});

	it('should drag and drop bun ingredient to bun zone', () => {
		cy.getBunIngredient().first().trigger('dragstart');
		cy.getBunZone().first().trigger('drop');

		cy.getIngredientInBunZone().should('exist');
	});

	it('should drag and drop main ingredient to main zone', () => {
		cy.getMainIngredient().first().trigger('dragstart');
		cy.getMainZone().first().trigger('drop');

		cy.getIngredientInMainZone().should('exist');
	});

	it('should handle multiple main ingredients in the constructor', () => {
		cy.getMainIngredient().each((ingredient) => {
			cy.wrap(ingredient).trigger('dragstart');
			cy.getMainZone().trigger('drop');
		});

		cy.getIngredientInMainZone().should('have.length.greaterThan', 0);
	});

	it('should not handle click on ingredient item while dragging', () => {
		cy.getBunIngredient().first().trigger('dragstart');
		cy.getBunIngredient().first().click();
		cy.getBunIngredient().should('not.have.class', 'active');
	});

	it('should not handle keydown events on ingredient item while dragging', () => {
		cy.getBunIngredient().first().trigger('dragstart');
		cy.getBunIngredient().first().focus();
		cy.getBunIngredient().trigger('keydown', {
			key: 'Enter',
		});
		cy.getBunIngredient().should('not.have.class', 'active');

		cy.getBunIngredient().first().focus();
		cy.getBunIngredient().trigger('keydown', { key: ' ' });
		cy.getBunIngredient().should('not.have.class', 'active');
	});

	it('should not allow dropping bun into main zone', () => {
		cy.getBunIngredient().first().trigger('dragstart');
		cy.getMainZone().trigger('drop');
		cy.getIngredientInMainZone().should('not.exist');
	});

	it('should not allow dropping main into bun zone', () => {
		cy.getMainIngredient().first().trigger('dragstart');
		cy.getBunZone().last().trigger('drop');
		cy.getIngredientInBunZone().should('not.exist');
	});

	it('should display bun at both top and bottom of constructor', () => {
		cy.getBunIngredient().first().trigger('dragstart');
		cy.getBunZone().first().trigger('drop');
		cy.getIngredientInBunZone().first().should('exist');
		cy.getIngredientInBunZone().last().should('exist');
	});

	it('should close modal on overlay click', () => {
		cy.openIngredientModal('bun');
		cy.get(Selectors.modal.overlay).click({ force: true });
		cy.get(Selectors.modal.modal).should('not.exist');
	});

	it('should close modal on close button click', () => {
		cy.openIngredientModal('main');
		cy.get(Selectors.modal.closeButton).click();
		cy.get(Selectors.modal.modal).should('not.exist');
	});

	it('should close modal on pressing ESC key', () => {
		cy.openIngredientModal('sauce');
		cy.get('body').type('{esc}');
		cy.get(Selectors.modal.modal).should('not.exist');
	});
});
