import React from "react";
import useSWR from "swr";

import { LettersStatusContext } from "../components/ContextProviders/LettersStatusProvider/LettersStatusProvider";

const ENDPOINT_VALIDATE_WORD =
  "https://api.dictionaryapi.dev/api/v2/entries/en/";

const useValidateWord = ({ fetcher, onValidWord }) => {
  const { updateLettersStatus } = React.useContext(
    LettersStatusContext
  );

  const [endpoint, setEndpoint] = React.useState(null);

  const { data, isLoading } = useSWR(endpoint, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    // revalidateOnMount: false,
    refreshInterval: 0,
  });
  const validateWord = (word) => {
    setEndpoint(ENDPOINT_VALIDATE_WORD + word.toLowerCase());
  };

  React.useEffect(() => {
    if (!endpoint) {
      // console.log("no endpoint", {
      //   endpoint,
      // });
      return undefined;
    }

    if (isLoading) {
      // console.log("loading...", {
      //   isLoading,
      // });
      return undefined;
    }

    if (!data) {
      // console.log("no data", {
      //   data,
      // });
      return undefined;
    }

    // console.log("valid word, submitting guess");
    onValidWord();

    setEndpoint(null);
  }, [data, endpoint]);

  return {
    validateWord,
  };
};

export default useValidateWord;
