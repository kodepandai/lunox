import useMagic from "../useMagic";
import type { ExtendedFacade } from "./Facade";

function useFacade<T>(clazz: any): T & typeof ExtendedFacade {
  // using Symbol(clazz.name) to avoid conflict with other abstract
  const abstract = Symbol(clazz.name);
  return useMagic(clazz, abstract);
}

export default useFacade;
