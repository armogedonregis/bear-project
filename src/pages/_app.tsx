import PageLayout from "@/layout/pageLayout";
import { wrapper } from "@/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appWithTranslation } from 'next-i18next';

function App({ Component, ...rest }: AppProps) {

  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <PageLayout>
        <Component {...props} />
        <ToastContainer />
      </PageLayout>
    </Provider>
  )
}

export default appWithTranslation(App);