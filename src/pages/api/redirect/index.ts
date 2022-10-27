import type { NextApiRequest, NextApiResponse } from 'next'
import { client, connectToRedis } from '../../../db/redis';
import connect from '../../../db/db';
import Url from '../../../models/url';

const updateClick = async (key: string) => {
  await connect();
  const url = await Url.findOne({ key });
  url.clicks += 1;
  await url.save();
  console.log('updated')
}

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
    const [key] = req.query.key as [string];
    console.log(key)
    const url = await client.get(key);
    // console.log(1)
    updateClick(key)
    // res.status(200).json({
    //   ok: false,
    //   status: 200,
    //   url
    // })
    const redirectUrl = url ? url : '/404'
    console.log('redirected')
    return res.redirect(301, redirectUrl)
  } catch (e: any) {
    return res.redirect(301, '/')
  }
}