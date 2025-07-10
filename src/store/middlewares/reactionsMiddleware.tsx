import { Middleware } from '@reduxjs/toolkit';
import { MiddlewareOptions } from '../store';
import { reactionsActions } from '../slices/reactionsSlice';
import { Logger } from '../../utils/Logger';

const logger = new Logger('ReactionsMiddleware');

const createReactionsMiddleware = ({
	mediaService,
}: MiddlewareOptions): Middleware => {
	logger.debug('createReactionsMiddleware()');

	mediaService.on('reaction', (peerId, reactionId) => {
		logger.debug('reaction event received [peerId:%s, reactionId:%s]', peerId, reactionId);
		// Dispatching directly to the store like this is not standard with RTK middleware structure.
		// This middleware doesn't actually use `next(action)` or `getState()`,
		// it just listens to mediaService and dispatches.
		// A more conventional way would be to dispatch an action that this middleware then handles,
		// or to integrate this logic into an existing middleware that has store.dispatch.
		// However, for simplicity and directness for this specific case:
		if (typeof (globalThis as any).store !== 'undefined') {
			(globalThis as any).store.dispatch(reactionsActions.setReaction({ peerId, reactionId }));
		} else {
			logger.error('Store not available on globalThis for dispatching reaction');
		}
	});

	// This middleware currently doesn't process any actions, it only sets up a listener.
	const middleware: Middleware = () => (next) => (action) => {
		return next(action);
	};

	return middleware;
};

export default createReactionsMiddleware;
