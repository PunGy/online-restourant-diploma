export const isError = (obj) => 'error' in obj
export const isValue = (obj) => obj != null && !isError(obj)