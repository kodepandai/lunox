function useFacade<T>(clazz: any):T{

  // credit to loilo for magic method in js
  // https://gist.github.com/loilo/4d385d64e2b8552dcc12a0f5126b6df8
  const classHandler = Object.create(null)
  classHandler.get = (target:any, name: string, receiver: any) => {
    
    if (name in target) {
      return target[name]
    } else {
      return target.__getStatic.call(receiver, name)
    }
  }

  return new Proxy(clazz, classHandler)
}

export default useFacade