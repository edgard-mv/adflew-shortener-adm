import { fetchAbsolute } from '../../utils/fetchAbsolute';

const shortenUrlMutation = (url) =>
  fetchAbsolute('/api/links', {
    method: 'POST',
    body: {
      url,
    },
  });

export default shortenUrlMutation;
