import type { NextApiRequest, NextApiResponse } from 'next'

import connect from '../../db/db';
import { client, connectToRedis } from '../../db/redis';
import Url from '../../models/url'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method !== 'POST')
      throw new Error(`cannot ${req.method}`)
    //connect to db
    await connect();
    if (!client.isReady)
      await connectToRedis();
    // get URL from request
    const link = req.body.url;
    // check if URL sent in request.
    if (!link)
      throw new Error('url field is required');
    //check if url is already found
    const checkUrl = await Url.findOne({ url: link });
    if (checkUrl)
      return res.setHeader('Set-Cookie', `logged=${checkUrl.key}`).status(200).json({
        ok: true,
        status: 200,
        message: 'link already found',
        url: checkUrl
      })
    //create new shorten url
    const url = new Url({ url: link });
    await client.set(url.key, url.url);

    await url.save();
    res.status(201).json({
      ok: true,
      status: 201,
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
