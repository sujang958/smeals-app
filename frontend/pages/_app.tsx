import "../styles/globals.css"
import type { AppProps } from "next/app"
import Image from "next/image"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="w-full min-h-screen font-pretendard">
      <header
        className="
      absolute top-0 left-0 right-0 w-full flex flex-col items-center"
      >
        <div className="flex flex-row items-center w-full max-w-7xl py-6 px-8">
          <div className="flex flex-row items-center space-x-3">
            <Image
              src={require("../public/favicon.png")}
              alt="App"
              width={52}
              height={52}
              objectFit="contain"
            />
            <p className="text-[1.68rem] font-bold">Smeals</p>
          </div>
        </div>
      </header>
      <Component {...pageProps} />
      <footer className="py-6 flex flex-col items-center">
        <p className="text-base">© 2022 Beal All Rights Reserved</p>
        <p className="text-base">
          Google Play 및 Google Play 로고는 Google LLC의 상표입니다.
        </p>
      </footer>
    </div>
  )
}

export default MyApp
