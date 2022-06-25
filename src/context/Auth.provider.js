import { createContext, useCallback, useContext, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import logUserInMutation from '../api/mutations/logUserIn.mutation';
import getUserInfoQuery from '../api/queries/getUserInfo.query';
import { USER_TOKEN } from '../utils/constants';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem(USER_TOKEN)
  );

  const logUserIn = useMutation(logUserInMutation, {
    onSuccess: (data) => {
      if (!!data?.token?.length) {
        sessionStorage.setItem(USER_TOKEN, data.token);
        setIsLoggedIn(true);
      }
    },
  });

  const { data: userInfo, isStale: isUserInfoStale } = useQuery(
    'userInfoRetrieval',
    getUserInfoQuery,
    {
      enabled: isLoggedIn,
      staleTime: Infinity,
    }
  );

  const logIn = (credentials) => {
    logOut();
    logUserIn.mutate(credentials);
  };

  const logOut = useCallback(() => {
    setIsLoggedIn(false);
    sessionStorage.removeItem(USER_TOKEN);
    queryClient.invalidateQueries('userInfoRetrieval', {
      refetchActive: false,
    });
  }, [queryClient]);

  const value = {
    logIn,
    logOut,
    isLoggedIn,
    userInfo: isUserInfoStale ? {} : userInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};

export { AuthContextProvider, useAuthContext };
