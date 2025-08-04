import React, { useEffect } from 'react';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type ModalProps = {
	isOpen: boolean;
	children: React.ReactNode;
	header?: React.ReactNode;
	footer?: React.ReactNode;
	onClose: () => void;
};

export const Modal = ({
	isOpen,
	onClose,
	children,
	header,
	footer,
}: ModalProps): React.JSX.Element => {
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return <></>;

	return (
		<div
			role='button'
			data-cy='modal-overlay'
			tabIndex={0}
			className={styles.overlay}
			onClick={onClose}
			onKeyDown={(e) => {
				if (e.key === 'Enter' || e.key === ' ') {
					onClose();
				}
			}}>
			<div
				role='button'
				data-cy='modal'
				tabIndex={0}
				className={styles.modal}
				onClick={(e) => e.stopPropagation()}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.stopPropagation();
					}
				}}>
				<div data-cy='modal-header' className={styles.header}>
					<div>{header}</div>
					<div data-cy='modal-close-button'>
						<CloseIcon type='primary' onClick={onClose} />
					</div>
				</div>

				<div data-cy='modal-content' className={styles.content}>
					{children}
				</div>
				{footer && (
					<div data-cy='modal-footer' className={styles.footer}>
						{footer}
					</div>
				)}
			</div>
		</div>
	);
};
