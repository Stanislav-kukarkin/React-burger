import { configureStore } from '@reduxjs/toolkit';
import { ingredientsApi } from './api/ingredients-api';
import { burgerConstructorSlice } from './slices/burger-constructor-slice';
import { ingredientModalSlice } from './slices/ingredient-modal-slice';
import { orderSlice } from './slices/order-slice';
import { dragSlice } from './slices/drag-slice';
import { authApi } from './api/auth-api';
import { userApi } from './api/user-api';
import { ordersApi } from './api/order-api';

export const store = configureStore({
	reducer: {
		[ingredientsApi.reducerPath]: ingredientsApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[userApi.reducerPath]: userApi.reducer,
		[ordersApi.reducerPath]: ordersApi.reducer,

		burgerConstructor: burgerConstructorSlice.reducer,
		ingredientModal: ingredientModalSlice.reducer,
		order: orderSlice.reducer,
		dragSlice: dragSlice.reducer,
	},

	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			ingredientsApi.middleware,
			authApi.middleware,
			userApi.middleware,
			ordersApi.middleware
		),

	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
