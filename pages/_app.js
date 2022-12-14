import Aos from "aos";
import { useEffect } from "react";
import { Provider } from "react-redux";
import store from "redux/store";
import "styles/_base.scss";
import "styles/_globals.scss";
import "aos/dist/aos.css";
import "react-toastify/dist/ReactToastify.css";
import { useProgressStore } from "helpers/common";
import { useRouter } from "next/router";
import { ProgressBar, PushNotification } from "components";

function MyApp({ Component, pageProps }) {
  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
  const isAnimating = useProgressStore((state) => state.isAnimating);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);

  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);
  return (
    <Provider store={store}>
      <ProgressBar isAnimating={isAnimating} />
      <PushNotification>
        <Component {...pageProps} />
      </PushNotification>
    </Provider>
  );
}

export default MyApp;
