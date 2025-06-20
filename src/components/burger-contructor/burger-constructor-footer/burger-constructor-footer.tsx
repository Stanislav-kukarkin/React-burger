import style from './burger-constructor-footer.module.css';
import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useCallback, useMemo, useState } from 'react';
import { OrderModal } from '../order-modal/order-modal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { useCreateOrderMutation } from '@/components/services/api/ingredients-api';
import { clearIngredients } from '@/components/services/slices/burger-constructor-slice';
import { setOrder } from '@/components/services/slices/order-slice';

const parseCode = (code: number): string => {
	return code.toString().padStart(6, '0');
};

export const BurgerConstructorFooter = (): React.JSX.Element => {
	const dispatch = useDispatch();
	const [isModalOpen, setModalOpen] = useState(false);
	const [orderCode, setOrderCode] = useState<string>('000000');
	const { bun, ingredients } = useSelector(
		(state: RootState) => state.burgerConstructor
	);

	const handleClose = () => setModalOpen(false);
	const [createOrder, { isLoading }] = useCreateOrderMutation();

	const handleShowOrderModal = useCallback(async () => {
		if (!bun || ingredients.length === 0) return;

		try {
			const response = await createOrder({
				ingredients: [bun._id, ...ingredients.map((item) => item._id), bun._id],
			}).unwrap();

			const nextCode = parseCode(response.order.number);
			setOrderCode(nextCode);

			dispatch(setOrder({ ingredients, number: nextCode }));
			dispatch(clearIngredients());

			setModalOpen(true);
		} catch (error) {
			console.error('Не удалось оформить заказ. Попробуйте позже.');
		}
	}, [bun, ingredients, createOrder]);

	const finalPrice = useMemo(() => {
		return [...(bun ? [bun, bun] : []), ...ingredients].reduce(
			(sum, item) => sum + item.price,
			0
		);
	}, [bun, ingredients]);

	return (
		<>
			<div className={`${style.container}`}>
				<div className={style.priceContainer}>
					<span className='text text_type_digits-medium'>{finalPrice}</span>
					<CurrencyIcon type='primary' className={style.icon} />
				</div>
				<Button
					htmlType='button'
					type='primary'
					size='large'
					onClick={handleShowOrderModal}
					disabled={isLoading || !bun || ingredients.length === 0}>
					{isLoading ? 'Подождите...' : 'Оформить заказ'}
				</Button>
			</div>
			<OrderModal
				isOpen={isModalOpen}
				onClose={handleClose}
				orderCode={orderCode}
			/>
		</>
	);
};
