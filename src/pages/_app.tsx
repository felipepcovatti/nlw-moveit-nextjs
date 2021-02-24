import '../styles/global.css'

import { ChallangesContextProvider } from '../contexts/ChallangesContext'

function MyApp({ Component, pageProps }) {
  return (
    <ChallangesContextProvider>
      <Component {...pageProps} />
    </ChallangesContextProvider>
  )
}

export default MyApp
