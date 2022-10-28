import type { NextApiRequest, NextApiResponse } from 'next'

import connect from '../../db/db';
import Url from '../../models/url'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method !== 'GET')
      throw new Error(`cannot ${req.method}`)
    //connect to db
    await connect();
    // get key from request
    const key = req.body.key;
    // check if URL sent in request.
    if (!key)
      throw new Error('key field is required');
    //check if url is already found
    const url = await Url.findOne({ key });
    if (!url)
      throw new Error('hash is not valid');
    if (url)
      return res.status(200).json({
        ok: true,
        status: 200,
        url
      })
  } catch (e: any) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: e.message
    })
  }
}
