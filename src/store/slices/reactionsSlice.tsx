import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface ReactionInfo {
	reactionId: string;
	timestamp: number; // Used to clear reaction after a timeout
}

export interface ReactionsState {
	[peerId: string]: ReactionInfo | undefined;
}

const initialState: ReactionsState = {};

const reactionsSlice = createSlice({
	name: 'reactions',
	initialState,
	reducers: {
		setReaction: (
			state,
			action: PayloadAction<{ peerId: string; reactionId: string }>
		) => {
			state[action.payload.peerId] = {
				reactionId: action.payload.reactionId,
				timestamp: Date.now(),
			};
		},
		clearReaction: (state, action: PayloadAction<{ peerId: string }>) => {
			delete state[action.payload.peerId];
		},
		clearAllReactions: () => {
			return initialState;
		}
	},
});

export const reactionsActions = reactionsSlice.actions;
export default reactionsSlice.reducer;

// Selectors
export const selectReactionByPeerId = (state: RootState, peerId: string): ReactionInfo | undefined =>
	state.reactions[peerId];

export const selectAllReactions = (state: RootState): ReactionsState => state.reactions;
