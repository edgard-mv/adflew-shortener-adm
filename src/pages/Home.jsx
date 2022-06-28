import { Button, Link, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import shortenUrlMutation from '../api/mutations/shortenUrl.mutation';
import { BOARD_ENTRIES } from '../api/queries/queryKeys';
import AppForm from '../components/AppForm';
import Board from '../components/Board';
import { BASE_URL } from '../utils/constants';

const Home = () => {
  const [candidateUrl, setCandidateUrl] = useState('');
  const [fullUrl, setFullUrl] = useState('');

  function onUrlChange(e) {
    setCandidateUrl(e.currentTarget.value);
  }

  const shortenUrl = useMutation(shortenUrlMutation, {
    onSuccess: (data) => {
      console.log({ data });
      setFullUrl(BASE_URL.concat(`/${data?.link?.shortCode}`));
    },
  });

  const candidateUrlHasChanged = candidateUrl !== shortenUrl?.data?.link?.url;

  function onSubmit(e) {
    e.preventDefault();
    if (candidateUrlHasChanged) {
      shortenUrl.mutate(candidateUrl);
    }
  }

  function copyToClipBoard() {
    navigator.clipboard.writeText(fullUrl);
  }

  const queryClient = useQueryClient();

  function onClickLink(e) {
    queryClient.invalidateQueries(BOARD_ENTRIES);
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '30px',
        p: 2,
        width: 'fit-content',
        maxWidth: 1,
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <AppForm>
        <Typography variant="h5" alignContent="center">
          URL Shortener
        </Typography>
        <Box
          component="form"
          sx={{
            mt: 3,
            display: 'flex',
          }}
          onSubmit={onSubmit}
          autoComplete="off"
        >
          <TextField
            value={candidateUrl}
            onChange={onUrlChange}
            placeholder="http(s)://"
            type="url"
            sx={{
              flex: 1,
            }}
            required
            label="URL"
          />
          <Button type="submit" variant="contained">
            Shorten
          </Button>
        </Box>
        {!candidateUrlHasChanged && (
          <Box
            sx={(theme) => ({
              display: 'inline-flex',
              alignItems: 'center',
              columnGap: '10px',
              width: 1,
              justifyContent: 'space-between',
              mt: 2,
              pl: 1,
              outline: 'solid 1px',
              outlineColor: theme.palette.primary.dark,
              borderRadius: 1,
            })}
          >
            <Link
              href={fullUrl}
              onClick={onClickLink}
              variant="body2"
              target="_blank"
              rel="noopener"
            >
              {fullUrl}
            </Link>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={copyToClipBoard}
            >
              Copy to clipboard
            </Button>
          </Box>
        )}
      </AppForm>
      <Board />
    </Box>
  );
};

export default Home;
