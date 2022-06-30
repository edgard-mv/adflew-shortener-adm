import { useQuery, useQueryClient } from 'react-query';
import { styled } from '@mui/material/styles';
import getBoardInfo from '../api/queries/getBoardInfo.query';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCellMui, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRowMui from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BASE_URL } from '../utils/constants';
import { Link } from '@mui/material';
import { BOARD_ENTRIES } from '../api/queries/queryKeys';

const TableCell = styled(TableCellMui)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const TableRow = styled(TableRowMui)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const getFullUrl = (shortCode) => BASE_URL.concat(`/${shortCode}`);

const Board = () => {
  const queryClient = useQueryClient();

  const { data: boardEntries } = useQuery([BOARD_ENTRIES], getBoardInfo);

  function onClickLink(e) {
    queryClient.invalidateQueries(BOARD_ENTRIES);
  }

  return (
    <TableContainer component={Paper} sx={{ maxHeight: '100%', maxWidth: 900 }}>
      <Table
        stickyHeader={true}
        sx={{ minWidth: 400 }}
        size="small"
        aria-label="Top most visited links"
      >
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Short URL</TableCell>
            <TableCell>Full URL</TableCell>
            <TableCell align="center">Visits</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {boardEntries?.top?.map((brdEntry, idx) => (
            <TableRow key={brdEntry?.shortCode}>
              <TableCell align="left">{idx + 1}</TableCell>
              <TableCell component="th" scope="row">
                <Link
                  href={getFullUrl(brdEntry?.shortCode)}
                  onClick={onClickLink}
                  variant="body2"
                  target="_blank"
                  rel="noopener"
                >
                  {getFullUrl(brdEntry?.shortCode)}
                </Link>
              </TableCell>
              <TableCell>
                <Link
                  href={brdEntry?.url}
                  onClick={onClickLink}
                  variant="body2"
                  target="_blank"
                  rel="noopener"
                >
                  {brdEntry?.url}
                </Link>
              </TableCell>
              <TableCell align="center">{brdEntry?.visits}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Board;
