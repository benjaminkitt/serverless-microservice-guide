/// <reference path="readability.d.ts"/>
/// <reference path="upndown.d.ts"/>
import * as readability from 'node-readability'
import * as upndown from 'upndown'

const und = new upndown()

const makeReadable = (url: string): Promise<readability.ReadableArticle> =>
  new Promise((resolve: Function, reject: Function) => {
    readability(url, (err: Error, article: readability.ReadableArticle) => {
      if (err) {
        return reject(err)
      }
      resolve(article)
    })
  })

const toMarkdown = (source: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    und.convert(source, (err: Error, mkd: string) => {
      if (err) {
        return reject(err)
      }
      resolve(mkd)
    })
  }
)}

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

  console.info('converting to markdown...')
  try {
    mkd = await toMarkdown(article.content)
  } catch (e) {
    return cb(e)
  }

  cb(null, {
    title: article.title,
    content: mkd
  })

  // Clean up readable article
  article.close()
}
