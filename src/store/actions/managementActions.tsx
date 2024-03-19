import { Logger } from '../../utils/Logger';
import { AppThunk } from '../store';

const logger = new Logger('ManagementActions');

export const getTenantFromFqdn = (fqdn: string): AppThunk<Promise<string | undefined>> => async (
	_dispatch,
	_getState,
	{ managementService }
): Promise<string | undefined> => {
	logger.debug('getTenantFromFqdn() [fqdn:%s]', fqdn);

	let tenantId: string | undefined;

	try {
		const { data } = await (await managementService).service('tenantFQDNs').find({ query: { fqdn, $limit: 1 } });

		tenantId = data[0]?.tenantId;
	} catch (error) {}

	return tenantId;
};

export const createRoom = (roomName: string): AppThunk<Promise<void>> => async (
	_dispatch,
	_getState,
	{ managementService }
): Promise<void> => {
	logger.debug('createRoom() [roomName:%s]', roomName);

	await (await managementService).service('rooms').create({
		name: roomName
	});
};
