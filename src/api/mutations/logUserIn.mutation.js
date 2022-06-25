import { fetchAbsolute } from '../../utils/fetchAbsolute';

const logUserInMutation = ({ username, password }) =>
  fetchAbsolute('/api/auth', {
    method: 'POST',
    body: {
      username,
      password,
    },
  });

export default logUserInMutation;
