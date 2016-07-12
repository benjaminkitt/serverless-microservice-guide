/// <reference path="readability.d.ts"/>
import * as readability from 'node-readability'

const makeReadable = (url: string): Promise<readability.ReadableArticle> =>
  new Promise((resolve: Function, reject: Function) => {
    readability(url, (err: Error, article: readability.ReadableArticle) => {
      if (err) {
        return reject(err)
      }
      resolve(article)
    })
  })

export interface MarkdownEvent {
  url: string
}

export const handler = async (event: MarkdownEvent, context: Object, cb: Function) => {
  console.info('event received...', JSON.stringify(event))

  console.info('making url readable...')
  let article: readability.ReadableArticle, mkd: string
  try {
    article = await makeReadable(event.url)
  } catch (e) {
    return cb(e)
  }

  cb(null)

  // Clean up readable article
  article.close()
}
