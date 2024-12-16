import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { createContext, useMemo, useState } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '@/routes/index';
const ColorModeContext = createContext({ toggleColorMode: () => {} });
import { HelmetProvider } from 'react-helmet-async';

import { WagmiConfig } from 'wagmi';
import { config } from '@/utils/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const routing = useRoutes(routes);
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  // // 仅在开发环境中初始化 vConsole
  // if (process.env.NODE_ENV === 'development') {
  //   // eslint-disable-next-line @typescript-eslint/no-var-requires, import/no-extraneous-dependencies
  //   const VConsole = require('vconsole');
  //   new VConsole();
  // }
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={config}>
          <StyledEngineProvider injectFirst>
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <HelmetProvider>{routing} </HelmetProvider>
              </ThemeProvider>
            </ColorModeContext.Provider>
          </StyledEngineProvider>
        </WagmiConfig>
      </QueryClientProvider>
    </>
  );
};
//监控组件是否重复渲染
App.whyDidYouRender = true;
export default App;
