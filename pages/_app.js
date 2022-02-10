import '../styles/globals.css'
import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

function MyApp({ Component, pageProps}) {
  return (
    <SessionProvider>
      <RecoilRoot>  
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp
