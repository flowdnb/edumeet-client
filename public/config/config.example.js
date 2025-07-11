/**
 * Edumeet App Configuration
 *
 * The configuration documentation is available also:
 * - in the app/README.md file in the source tree
 */

// eslint-disable-next-line
var config = {
	// If enabled QR code will show at the join dialog
	qrCodeEnabled: false,
	// If enabled countdownTimer will be enabled in the room.
	countdownTimerEnabled: false,
	// If enabled a Tooltip will show at the landing page and join dialog bottom
	infoTooltipEnabled: false,
	infoTooltipText: 'Tooltip text',
	infoTooltipLink: '',
	infoTooltipDesc: 'Tooltip desc ... Lorem ipsum',
	// Location of management service.
	managementUrl: 'http://localhost:3030',
	// Location of the privacy files.
	imprintUrl: '',
	privacyUrl: '',

	loginImageURL: '',
	// If ability to log in is enabled.
	loginEnabled: true,

	// The development server listening port.
	developmentPort: 8443,

	// The production server listening port.
	productionPort: 443,

	// If the server component runs on a different host than the app you can specify the host name.
	serverHostname: '',

	// Join dialog defaults to ask for media, this can be disabled by setting this to false.
	askForMediaOnJoin: true,

	// Don't show the participant tile if the user has no video
	hideNonVideo: false,

	// The default video camera capture resolution.
	resolution: 'medium',

	// The default video camera capture framerate.
	frameRate: 30,

	// The default screen sharing resolution.
	screenSharingResolution: 'veryhigh',

	// The default screen sharing framerate.
	screenSharingFrameRate: 5,

	// Video aspect ratio.
	aspectRatio: 1.778,

	// Enable or disable simulcast for webcam video.
	simulcast: true,

	// Enable or disable simulcast for screen sharing video.
	simulcastSharing: false,

	// Auto gain control enabled.
	autoGainControl: true,

	// Echo cancellation enabled.
	echoCancellation: true,

	// Noise suppression enabled.
	noiseSuppression: true,

	// The audio sample rate.
	sampleRate: 48000,

	// The audio channels count.
	channelCount: 1,

	// The audio sample size count.
	sampleSize: 16,

	// If OPUS FEC stereo be enabled.
	opusStereo: false,

	// If OPUS DTX should be enabled.
	opusDtx: true,

	// If OPUS FEC should be enabled.
	opusFec: true,

	// The OPUS packet time.
	opusPtime: 20,

	// The OPUS playback rate.
	opusMaxPlaybackRate: 48000,

	// The audio preset
	audioPreset: 'conference',

	// The audio presets.
	audioPresets: {
		'conference': {
			'name': 'Conference audio',
			'autoGainControl': true,
			'echoCancellation': true,
			'noiseSuppression': true,
			'sampleRate': 48000,
			'channelCount': 1,
			'sampleSize': 16,
			'opusStereo': false,
			'opusDtx': true,
			'opusFec': true,
			'opusPtime': 20,
			'opusMaxPlaybackRate': 48000
		},
		'hifi': {
			'name': 'HiFi streaming',
			'autoGainControl': false,
			'echoCancellation': false,
			'noiseSuppression': false,
			'sampleRate': 48000,
			'channelCount': 2,
			'sampleSize': 16,
			'opusStereo': true,
			'opusDtx': false,
			'opusFec': true,
			'opusPtime': 60,
			'opusMaxPlaybackRate': 48000
		}
	},

	// If true, the media control buttons will be shown in separate control bar, not in the ME container.
	buttonControlBar: true,

	// It sets the notifications sounds.
	// Valid keys are: 'parkedPeer', 'parkedPeers', 'raisedHand', 
	// 'chatMessage', 'sendFile', 'newPeer' and 'default'.
	// Not defining a key is equivalent to using the default notification sound.
	// Setting 'play' to null disables the sound notification.
	notificationSounds: {
		'chatMessage': {
			'play': '/sounds/notify-chat.mp3'
		},
		'raisedHand': {
			'play': '/sounds/notify-hand.mp3'
		},
		'finishedCountdownTimer': {
			'play': '/sounds/notify-countdowntimer.mp3'
		},
		'reaction_thumbup' : {
			'play' : '/sounds/notify-thumbup.mp3',
		},
		'reaction_thumbdown' : {
			'play' : '/sounds/notify-thumbdown.mp3',
		},
		'reaction_clap' : {
			'play' : '/sounds/notify-clap.mp3',
		},
		'reaction_party' : {
			'play' : '/sounds/notify-party.mp3',
		},
		'reaction_smile' : {
			'play' : '/sounds/notify-smile.mp3',
		},
		'default': { // Default sound for other notifications not specified above
			'debounce': 5000,
			'play': '/sounds/notify.mp3'
		}
	},

	// The title to show if the logo is not specified.
	title: 'edumeet',

	// If true, a random room name will be generated when the input field is blank;
	// otherwise, it will remain empty and users will have to enter a room name.
	randomizeOnBlank: true,

	// Enable or disable transcription.
	transcriptionEnabled: true,

	// Imprint. If you want to link your imprint, please provide a URL in this variable. If it is empty, no link will be shown.
	imprintUrl: '',

	// Privacy notice. If you want to link your privacy notices, please provide a URL in this variable. If it is empty, no link will be shown.
	privacyUrl: '',

	// Client theme. Take a look at mui theme documentation.
	theme: {
		palette: {
			primary: {
				main: '#313131',
			}
		},
		// The page background image URL
		backgroundImage: 'images/background.jpg',
		appBarColor: '#313131', // AppBar background color
		appBarFloating: true, // If true, the AppBar will be moved in a bit from the top and sides of the page
		// If not null, it shows the logo loaded from the specified URL, otherwise it shows the title.
		logo: 'images/logo.edumeet.svg',
		activeSpeakerBorder: '1px solid rgba(255, 255, 255, 1.0)',
		videoBackroundColor: 'rgba(49, 49, 49, 0.9)',
		videoAvatarImage: 'images/buddy.svg',
		sideContentItemColor: 'rgba(255, 255, 255, 0.4)',
		sideContentItemDarkColor: 'rgba(150, 150, 150, 0.4)',
		roundedness: 10, // Rounded corners on the various elements
	},
	reduxLoggingEnabled: false
};
