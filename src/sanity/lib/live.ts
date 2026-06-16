import { defineLive } from "next-sanity/live"
import { serverClient } from './client'

export const { sanityFetch, SanityLive } = defineLive({
  client: serverClient,
  serverToken: process.env.SANITY_API_READ_TOKEN,
})
