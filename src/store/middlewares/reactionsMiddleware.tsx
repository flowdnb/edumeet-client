import { Middleware } from '@reduxjs/toolkit';
import { MiddlewareOptions } from '../store';
import { reactionsActions } from '../slices/reactionsSlice';
import { Logger } from '../../utils/Logger';

const logger = new Logger('ReactionsMiddleware');

const createReactionsMiddleware = ({
	mediaService,
}: MiddlewareOptions): Middleware => {
	logger.debug('createReactionsMiddleware()');

	const middleware: Middleware = (store) => (next) => (action) => {
		mediaService.on('reaction', (peerId, reactionId) => {
			logger.debug('reaction event received [peerId:%s, reactionId:%s]', peerId, reactionId);
			const dispatch = store.dispatch;

			dispatch(reactionsActions.setReaction({ peerId, reactionId }));
		});

		return next(action);
	};

	return middleware;
};

export default createReactionsMiddleware;