import React, { useEffect } from 'react';
import { useAppSelector, useIsActiveSpeaker, useAppDispatch } from '../../store/hooks';
import { isMobileSelector } from '../../store/selectors';
import { reactionsActions, selectReactionByPeerId } from '../../store/slices/reactionsSlice';
import { styled } from '@mui/material/styles';
import DisplayName from '../displayname/DisplayName';
// Placeholder icons - these should ideally be centralized
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDownAlt';
import SmileyIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ClapIcon from '@mui/icons-material/SignLanguage';
import PartyIcon from '@mui/icons-material/Celebration';
import { Box } from '@mui/material';
import UnmuteAlert from '../unmutealert/UnmuteAlert';
import VideoBox from '../videobox/VideoBox';
import VideoView from '../videoview/VideoView';
import Volume from '../volume/Volume';
import PeerStatsView from '../rtpquality/PeerStatsView';
import QualityIndicator from '../rtpquality/QualityIndicator';

interface MeProps {
	style: Record<'width' | 'height', number>
}

// Replicated from VideoConsumer.tsx - should be centralized
const ReactionIconContainer = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: theme.spacing(1),
	left: '50%',
	transform: 'translateX(-50%)',
	zIndex: 10,
	padding: theme.spacing(0.5),
	backgroundColor: 'rgba(0, 0, 0, 0.4)',
	borderRadius: theme.shape.borderRadius,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '2rem',
}));

const reactionIcons: { [key: string]: JSX.Element } = {
	thumbup: <ThumbUpIcon fontSize="inherit" style={{ color: 'white' }} />,
	thumbdown: <ThumbDownIcon fontSize="inherit" style={{ color: 'white' }} />,
	clap: <ClapIcon fontSize="inherit" style={{ color: 'white' }} />,
	party: <PartyIcon fontSize="inherit" style={{ color: 'white' }} />,
	smile: <SmileyIcon fontSize="inherit" style={{ color: 'white' }} />,
};

const REACTION_TIMEOUT_MS = 10000;

const Me = ({ style }: MeProps): React.JSX.Element => {
	const dispatch = useAppDispatch();
	const mirroredSelfView = useAppSelector((state) => state.settings.mirroredSelfView);
	const displayName = useAppSelector((state) => state.settings.displayName);
	const hideSelfView = useAppSelector((state) => state.settings.hideSelfView);
	const contain = useAppSelector((state) => state.settings.videoContainEnabled);
	const meId = useAppSelector((state) => state.me.id);
	const reactionInfo = useAppSelector((state) => selectReactionByPeerId(state, meId));
	const isActiveSpeaker = useIsActiveSpeaker(meId);
	const isMobile = useAppSelector(isMobileSelector);
	const showStats = useAppSelector((state) => state.ui.showStats);
	const micEnabled = useAppSelector((state) => state.me.micEnabled);
	const webcamEnabled = useAppSelector((state) => state.me.webcamEnabled);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | undefined;

		if (reactionInfo) {
			const timeSinceReaction = Date.now() - reactionInfo.timestamp;

			if (timeSinceReaction < REACTION_TIMEOUT_MS) {
				timeoutId = setTimeout(() => {
					dispatch(reactionsActions.clearReaction({ peerId: meId }));
				}, REACTION_TIMEOUT_MS - timeSinceReaction);
			} else {
				dispatch(reactionsActions.clearReaction({ peerId: meId }));
			}
		}
		
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [ reactionInfo?.timestamp, meId, dispatch ]);

	const currentReactionIcon = reactionInfo ? reactionIcons[reactionInfo.reactionId] : null;

	return (
		<>
			{ !hideSelfView && (
				<VideoBox
					activeSpeaker={isActiveSpeaker}
					order={1}
					width={style.width}
					height={style.height}
				>
					{currentReactionIcon && (
						<ReactionIconContainer>
							{currentReactionIcon}
						</ReactionIconContainer>
					)}
					{ webcamEnabled && <VideoView mirrored={mirroredSelfView} contain={contain} source='webcam' /> }
					{ micEnabled && <Volume /> }
					{ micEnabled && !isMobile && <UnmuteAlert /> }

					<DisplayName disabled={false} displayName={displayName} isMe />
					{ !isMobile && showStats && <PeerStatsView /> }
					<QualityIndicator />

				</VideoBox>
			)}
		</>
	);
};

export default Me;
