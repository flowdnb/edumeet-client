import { useEffect } from 'react';
import {
	useAppSelector,
	usePeer,
	usePeerConsumers,
	useAppDispatch
} from '../../store/hooks';
import { activeSpeakerIdSelector, isMobileSelector } from '../../store/selectors';
import { StateConsumer } from '../../store/slices/consumersSlice';
import { reactionsActions, selectReactionByPeerId } from '../../store/slices/reactionsSlice';
import { styled } from '@mui/material/styles';
import FullscreenVideoButton from '../controlbuttons/FullscreenVideoButton';
import WindowedVideoButton from '../controlbuttons/WindowedVideoButton';
// Placeholder icons - these should ideally be centralized with ReactionsButton
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDownAlt';
import SmileyIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ClapIcon from '@mui/icons-material/SignLanguage';
import PartyIcon from '@mui/icons-material/Celebration';
import { Box } from '@mui/material';
import DisplayName from '../displayname/DisplayName';
import MediaControls from '../mediacontrols/MediaControls';
import PeerStatsView from '../rtpquality/PeerStatsView';
import QualityIndicator from '../rtpquality/QualityIndicator';
import VideoBox from '../videobox/VideoBox';
import VideoView from '../videoview/VideoView';
import Volume from '../volume/Volume';

interface VideoConsumerProps {
	consumer: StateConsumer;
	style: Record<'width' | 'height', number>
}

const ReactionIconContainer = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: theme.spacing(1),
	left: '50%', // Center horizontally
	transform: 'translateX(-50%)', // Adjust for centering
	zIndex: 10,
	padding: theme.spacing(0.5),
	backgroundColor: 'rgba(0, 0, 0, 0.4)',
	borderRadius: theme.shape.borderRadius,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	fontSize: '2rem', // Make icon larger
}));

const reactionIcons: { [key: string]: JSX.Element } = {
	thumbup: <ThumbUpIcon fontSize="inherit" style={{ color: 'white' }} />,
	thumbdown: <ThumbDownIcon fontSize="inherit" style={{ color: 'white' }} />,
	clap: <ClapIcon fontSize="inherit" style={{ color: 'white' }} />,
	party: <PartyIcon fontSize="inherit" style={{ color: 'white' }} />,
	smile: <SmileyIcon fontSize="inherit" style={{ color: 'white' }} />,
};

const REACTION_TIMEOUT_MS = 10000;

const VideoConsumer = ({ consumer, style }: VideoConsumerProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const { peerId, source } = consumer;
	const reactionInfo = useAppSelector((state) => selectReactionByPeerId(state, peerId));

	const { micConsumer } = usePeerConsumers(peerId);
	const peer = usePeer(peerId);
	const contain = source === 'screen';

	const isMobile = useAppSelector(isMobileSelector);
	const activeSpeaker = useAppSelector(activeSpeakerIdSelector) === peerId;
	const headless = useAppSelector((state) => state.room.headless);
	const showStats = useAppSelector((state) => state.ui.showStats);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout | undefined;

		if (reactionInfo) {
			const timeSinceReaction = Date.now() - reactionInfo.timestamp;

			if (timeSinceReaction < REACTION_TIMEOUT_MS) {
				timeoutId = setTimeout(() => {
					dispatch(reactionsActions.clearReaction({ peerId }));
				}, REACTION_TIMEOUT_MS - timeSinceReaction);
			} else {
				dispatch(reactionsActions.clearReaction({ peerId }));
			}
		}
		
		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, [ reactionInfo?.timestamp, peerId, dispatch ]);

	const currentReactionIcon = reactionInfo ? reactionIcons[reactionInfo.reactionId] : null;

	return (
		<VideoBox
			activeSpeaker={activeSpeaker}
			order={1}
			width={style.width}
			height={style.height}
		>
			{currentReactionIcon && (
				<ReactionIconContainer>
					{currentReactionIcon}
				</ReactionIconContainer>
			)}
			<VideoView consumer={consumer} contain={contain} />
			{ micConsumer && <Volume consumer={micConsumer} /> }
			{ !headless &&
				<>
					<DisplayName displayName={peer?.displayName} peerId={peerId} />
					<MediaControls
						orientation='horizontal'
						horizontalPlacement='center'
						verticalPlacement='center'
					>
						<FullscreenVideoButton consumerId={consumer.id} toolTipLocation='bottom' />
						{ !isMobile && <WindowedVideoButton consumerId={consumer.id} toolTipLocation='bottom' /> }
					</MediaControls>
					{ !isMobile && showStats && <PeerStatsView consumerId={consumer.id} /> }
					<QualityIndicator />
				</>
			}
		</VideoBox>
	);
};

export default VideoConsumer;
