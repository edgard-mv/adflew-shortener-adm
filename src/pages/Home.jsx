import { Button, Link, TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { useMutation } from 'react-query';
import shortenUrlMutation from '../api/mutations/shortenUrl.mutation';
import AppForm from '../components/AppForm';
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

  return (
    <Box
      sx={{
        display: 'flex',
        width: 1,
        height: '100%',
        justifyContent: 'center',
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
            my: 3,
            display: 'flex',
            minWidth: '400px',
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
              pl: 1,
              outline: 'solid 1px',
              outlineColor: theme.palette.primary.dark,
              borderRadius: 1,
            })}
          >
            <Link href={fullUrl} variant="body2" target="_blank" rel="noopener">
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
    </Box>
  );
};

export default Home;
