import { useState, useContext } from 'react';
import ControlButton, { ControlButtonProps } from './ControlButton';
import SmileyIcon from '@mui/icons-material/SentimentSatisfiedAlt'; // Placeholder icon
import { ServiceContext } from '../../store/store';
import ThumbUpIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDownAlt';
import ClapIcon from '@mui/icons-material/SignLanguage'; // Placeholder, better icon might be needed
import PartyIcon from '@mui/icons-material/Celebration'; // Placeholder
import FloatingMenu from '../floatingmenu/FloatingMenu';
import { MenuItem } from '@mui/material'; // Using MenuItem directly for now
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { reactionsActions } from '../../store/slices/reactionsSlice';
import { meSelector } from '../../store/selectors';

// Define reaction types
const reactionTypes = [
	{ id: 'thumbup', label: 'Thumbs Up', icon: <ThumbUpIcon fontSize="small" /> },
	{ id: 'thumbdown', label: 'Thumbs Down', icon: <ThumbDownIcon fontSize="small" /> },
	{ id: 'clap', label: 'Clap', icon: <ClapIcon fontSize="small" /> },
	{ id: 'party', label: 'Party', icon: <PartyIcon fontSize="small" /> },
	{ id: 'smile', label: 'Smile', icon: <SmileyIcon fontSize="small" /> },
];

const ReactionsButton = (props: ControlButtonProps): JSX.Element => {
	const dispatch = useAppDispatch();
	const me = useAppSelector(meSelector); // Get the current user's ID

	const [ menuAnchorEl, setMenuAnchorEl ] = useState<HTMLElement | null>(null);
	const isMenuOpen = Boolean(menuAnchorEl);

	const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMenuAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setMenuAnchorEl(null);
	};

	const { mediaService } = useContext(ServiceContext); // Get mediaService from context

	const handleReactionClick = (reactionId: string) => {
		if (me.id) {
			// Dispatch locally immediately for responsiveness
			dispatch(reactionsActions.setReaction({ peerId: me.id, reactionId }));
			// Send to others
			mediaService.sendReaction(reactionId);
		}
		handleMenuClose();
	};

	return (
		<>
			<ControlButton
				toolTip="Reactions" // TODO: Add translation
				onClick={handleMenuOpen}
				{...props}
			>
				<SmileyIcon />
			</ControlButton>
			<FloatingMenu
				anchorEl={menuAnchorEl}
				open={isMenuOpen}
				onClose={handleMenuClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
			>
				{reactionTypes.map((reaction) => (
					<MenuItem
						key={reaction.id}
						onClick={() => handleReactionClick(reaction.id)}
						// TODO: Style menu items if needed
					>
						{reaction.icon}
						{/* Optionally, add reaction.label here if icons are not clear enough */}
					</MenuItem>
				))}
			</FloatingMenu>
		</>
	);
};

export default ReactionsButton;
