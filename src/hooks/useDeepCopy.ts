/**
 * Object deep copy
 * @param data incoming object
 * @param hash for internal recursive use, external calls do not need to be passed in
 * @returns new object
 */
export const useDeepCopy = (data: any, hash = new WeakMap()) => {
  if (typeof data !== 'object' || data === null) {
    throw new TypeError('The incoming parameter is not an object')
  }
  if (hash.has(data)) {
    return hash.get(data)
  }
  const newData: any = {}
  const dataKeys = Object.keys(data)
  dataKeys.forEach(value => {
    const currentDataValue = data[value]
    if (typeof currentDataValue !== 'object' || currentDataValue === null) {
      newData[value] = currentDataValue
    } else if (Array.isArray(currentDataValue)) {
      newData[value] = [...currentDataValue]
    } else if (currentDataValue instanceof Set) {
      newData[value] = new Set([...currentDataValue])
    } else if (currentDataValue instanceof Map) {
      newData[value] = new Map([...currentDataValue])
    } else {
      hash.set(data, data)
      newData[value] = useDeepCopy(currentDataValue, hash)
    }
  })
  return newData
}
