/**
 * Make a GET request at the given `url`, returning the response body as JSON.
 *
 * If the request fails, print the error to the console and return `undefined`.
 */
export const get = async<T>(url: string): Promise<T | undefined> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    let err = error as Error;
    console.error(err.message);
  }

  return undefined;
}
