import { configureStore } from '@reduxjs/toolkit';
import { ingredientsApi } from './api/ingredients-api';
import { burgerConstructorSlice } from './slices/burger-constructor-slice';
import { ingredientModalSlice } from './slices/ingredient-modal-slice';
import { orderSlice } from './slices/order-slice';
import { dragSlice } from './slices/drag-slice';

export const store = configureStore({
	reducer: {
		[ingredientsApi.reducerPath]: ingredientsApi.reducer,
		burgerConstructor: burgerConstructorSlice.reducer,
		ingredientModal: ingredientModalSlice.reducer,
		order: orderSlice.reducer,
		dragSlice: dragSlice.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(ingredientsApi.middleware),
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
