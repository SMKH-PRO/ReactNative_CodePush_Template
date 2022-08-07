/** ALL THE API CALLING WILL BE DONE FROM THIS FILE, DO NOT CALL API FROM ANY OTHER FILE
 * though you can import these function and then use them in other files/components.
 * remove this comment after all team is aware of this note.
 *  */
import { EXAMPLE_API } from './endpoints';
import https from '../configs/https';
import type { ExampleAPIResponse } from '../utils/types/api.types';

const exampleRequest = (
  body: { token: string }, /// Remove this example code soon.
) => https.post<ExampleAPIResponse>(EXAMPLE_API, body);

export { exampleRequest };
