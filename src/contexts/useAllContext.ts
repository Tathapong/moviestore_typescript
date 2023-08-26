import { useContext } from "react";
import { Context } from "./Contexts";

const useAllContext = () => {
  const currentContext = useContext(Context);

  if (!currentContext) {
    throw new Error("useAllContext has to be used within Provider");
  }
  return currentContext;
};

export default useAllContext;
