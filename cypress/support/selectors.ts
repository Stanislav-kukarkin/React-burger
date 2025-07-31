export const Selectors = {
	modal: {
		overlay: '[data-cy="modal-overlay"]',
		modal: '[data-cy="modal"]',
		header: '[data-cy="modal-header"]',
		content: '[data-cy="modal-content"]',
		footer: '[data-cy="modal-footer"]',
		closeButton: '[data-cy="modal-close-button"]',
	},
	ingredients: {
		bun: {
			ingredient: '[data-cy="ingredient-item-bun"]',
			constructorIngredient: '[data-cy="constructor-item-bun"]',
		},
		main: {
			ingredient: '[data-cy="ingredient-item-main"]',
			constructorIngredient: '[data-cy="constructor-item-main"]',
		},
		sauce: {
			ingredient: '[data-cy="ingredient-item-sauce"]',
			constructorIngredient: '[data-cy="constructor-item-sauce"]',
		},
	},

	dropZones: {
		bun: '[data-cy="constructor-bun-zone"]',
		main: '[data-cy="constructor-main-zone"]',
	},
};
