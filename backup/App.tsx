import {
  createContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import clsx from 'clsx';
import { useAdaptiveLayout } from '@hooks/useAdaptiveFontSize';
import { useImmer } from '@/hooks/useImmer';
import { useAtom } from 'jotai';
import { countAtom, testState } from '@/states';
let num = 0;
const commonStyles = {
  font: "text-base font-medium font-['Roboto Mono'] leading-none",
};
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from '@mui/material/styles';
import Button from '@/components/ui/Button';
const ColorModeContext = createContext({ toggleColorMode: () => {} });
const App = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  //下面的组件获取当前的主题
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  // const [test] = useAtom(testState);
  const [value, setValue] = useState('');
  //const [data, setData] = useState({ a: 1 });
  // const [data, setData] = useImmer({ a: 1 });
  const [count, setCount] = useAtom(countAtom);

  useAdaptiveLayout();

  const inc = () =>
    setCount((draft) => {
      draft.value = 1;
    });
  console.log('🐻🐻🐻🐻🐻🐻: ', count);
  // console.log('🍊');
  // useAdaptiveLayout();
  // useEffect(() => {
  //   //console.log('🐻🐻🐻🐻🐻🐻: ', ++num);
  //   console.log('🐻🐻🐻🐻🐻🐻 ', count);
  // }, [count]);
  return (
    <StyledEngineProvider injectFirst>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div className="px-5 md:px-0 w-full flex justify-center">
            <div className="w-full min-w-10 bg-[#a9f2ce]/5 rounded-full border border-primary flex items-center gap-1 p-1">
              <div className="flex-1 flex items-center px-3">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className={clsx(
                    commonStyles.font,
                    'w-full bg-transparent text-white',
                    'focus:outline-none caret-primary'
                  )}
                  placeholder="Enter search term..."
                />
              </div>
              <Button onClick={inc}>Search</Button>
            </div>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </StyledEngineProvider>
  );
};
App.whyDidYouRender = true;
export default App;
