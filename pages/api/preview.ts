import { NextApiHandler, NextApiResponse } from "next";

import { previewApiKeyCookieName } from "../../lib/cookies";

const handler: NextApiHandler = async (req, res) => {
  // TODO move secret to env variables
  if (req.query.secret !== 'mySuperSecret' || !req.query.slug ||!req.query.type) {
    res.status(401).json({ message: 'Invalid preview token, or no slug and type provided.' });
    return;
  }

  const currentPreviewApiKey = req.cookies[previewApiKeyCookieName];

  // Enable Preview Mode by setting the cookies
  res.setPreviewData({ currentPreviewApiKey });
  const newCookieHeader = makeCookiesCrossOrigin(res);
  if (newCookieHeader) {
    res.setHeader("Set-Cookie", newCookieHeader);
  }
  let url ='/'
  if(req.query.type !== 'web_spotlight_root') {
  // Redirect to the path from the fetched post
   url = `/${req.query.type}/${req.query.slug}`
    }
  res.redirect(url);
}

export default handler;

const makeCookieCrossOrigin = (header: string) => {
  const cookie = header.split(";")[0];

  return cookie
    ? `${cookie}; Path=/; SameSite=None; Secure`
    : "";
};

const makeCookiesCrossOrigin = (response: NextApiResponse) => {
  const header = response.getHeader("Set-Cookie");

  if (typeof header === "string") {
    return makeCookieCrossOrigin(header);
  }
  if (Array.isArray(header)) {
    return header.map(makeCookieCrossOrigin);
  }

  return header;
}