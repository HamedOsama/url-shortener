import type { NextApiRequest, NextApiResponse } from 'next'
import { client, connectToRedis } from '../../../db/redis';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET')
      throw new Error(`cannot ${req.method}`)
    // console.log(client)
    if (!client.isReady)
      await connectToRedis();
    const key = req.query.key as string;
    const url = await client.get(key);
    // res.status(200).json({
    //   ok: false,
    //   status: 200,
    //   url
    // })
    const redirectUrl = url ? url : '/404'
    return res.redirect(301, redirectUrl)
  } catch (e: any) {
    return res.redirect(301, '/')
    // res.status(500).json({
    //   ok: false,
    //   status: 500,
    //   message: e.message
    // })
  }
}