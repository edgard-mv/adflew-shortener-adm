import { fetchAbsolute } from '../../utils/fetchAbsolute';

const getBoardInfo = ({ queryKey }) => {
  const { limit = 20 } = queryKey[1] ?? {};
  return fetchAbsolute(`/api/board/${limit}`);
};

export default getBoardInfo;
