import React, { Fragment, useState, useEffect } from 'react';
import { PageLayout } from '../app/components';
import { LoadingPage, NotFound } from '../app/pages';
import { Home } from '../app/pages';
import { Router, Redirect } from "@reach/router";
import { navigate } from 'gatsby';
// import { isLoggedIn } from '../utils/is-logged-in';
import { getAccountFromSession } from '../amplify/auth';
import { currentAccountVar } from '../apollo/cache';

const App =  () => {
  
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const accountResponse = await getAccountFromSession();
      if (accountResponse?.account !== undefined) {
        const { accessToken, email, sub } = accountResponse.account;
        currentAccountVar({
          isLoggedIn: true,
          email,
          sub,
          accessToken
        });
        setIsLoading(false);
      }
      else {
        navigate('/login');
      }
    })()
  })
  return (
    isLoading ? 
    <LoadingPage /> :
    <PageLayout>
      <Router basepath='/app'>
        <Home path='/'/>
        <NotFound default={true}/>
      </Router>
    </PageLayout>
  );
}

export default App;