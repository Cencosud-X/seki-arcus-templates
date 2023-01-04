import React, { useState, useEffect } from 'react';

import './themes/default.css';
import '@arcus-core/ui-shared';
import 'antd/dist/antd.less'

import BootingPage from './pages/booting';
import SignInPage from './pages/sign-in';
import { AuthenticationClient } from '@arcus-core/web-core-utilities';
import MainLayout from './pages/layout';

const App: React.FC = () => {
  const [authenticated, setAuth] = useState<boolean>(false);
  const [booting, setAppBooting] = useState<boolean>(true);

  useEffect(() => {
    const getStorageClientData = async () => {
      try {
        await AuthenticationClient.boot();
        setAuth(AuthenticationClient.isAuthenticated());
      } catch (error) {
        console.error(error);
      }
    };
    getStorageClientData();
  }, []);

  const onBootCompleteHandler = () => {
    setAppBooting(false);
  };

  const onAuthenticatedHandler = () => {
    setAuth(true);
  };

  if (booting) {
    return <BootingPage onLoadComplete={onBootCompleteHandler} />;
  }

  if (!authenticated) {
    return <SignInPage onAuthenticated={onAuthenticatedHandler} />;
  }

  return <MainLayout />;
};

export default App;