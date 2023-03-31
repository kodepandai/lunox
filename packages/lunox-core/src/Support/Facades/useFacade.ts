import useMagic from "../useMagic";
import type { ExtendedFacade } from "./Facade";

function useFacade<T>(clazz: any): T & typeof ExtendedFacade {
  // uniqId of Facade to that will registered to singleton later
  const abstract = clazz.name + Date.now();
  return useMagic(clazz, abstract);
}

export default useFacade;
