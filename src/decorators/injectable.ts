// eslint-disable-next-line no-unused-vars
export const injectable = <T extends { new (..._args: any[]): {} }>(
  Ctor: T
) => {
  let instance!: any
  return new Proxy(Ctor, {
    construct(t, args) {
      if (!instance) {
        instance = new Ctor(args)
      }
      return instance
    }
  })
}
