import { fetchAbsolute } from '../../utils/fetchAbsolute';

const getUserInfoQuery = () => fetchAbsolute('/api/auth');

export default getUserInfoQuery;
