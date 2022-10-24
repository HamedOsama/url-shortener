import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '../../db/db';


import Url from '../../models/url'



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    if (req.method !== 'POST')
      throw new Error(`cannot ${req.method}`)
    console.log('connecting to mongodb')
    await connect()
    console.log('adding')
    const data = req.body;
    const url = await Url.create(data);
    // await url.save();
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
