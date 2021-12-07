/**
 * Samson Backend response structure
 * @field data - the requested data
 * @field message - backend response message
 */
export interface Response<T> {
  results: T;
  message?: string;
}
