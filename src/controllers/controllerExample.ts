/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { Request, Response } from 'express';
import { getMessage } from '../services/serviceExample';

export const example = ( _req: Request, res: Response ) => {

  const message: string = getMessage();
  return res.status( 200 ).json({
    message: message
  });

}
