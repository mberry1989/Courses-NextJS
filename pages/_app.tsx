import { useEffect } from 'react';
import { useSmartLink } from '../lib/useSmartLink';
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const smartLink = useSmartLink()
  return <Component {...pageProps} />
}

export default MyApp
