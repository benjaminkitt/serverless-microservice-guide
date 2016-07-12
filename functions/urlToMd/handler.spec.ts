/// <reference path="mute.d.ts"/>
import { use, expect } from 'chai'
import { stub, match } from 'sinon'
import * as sinonChai from 'sinon-chai'
import * as nock from 'nock'
import * as mute from 'mute'
import { handler } from './handler'

use(sinonChai)

let evt = require('./event.json')
let testHtml = `<!DOCTYPE html>
  <html>
    <head><title>This is an article title</title></head>
    <body>
      <h1>This is an article title</h1>
      <p>Pellentesque habitant morbi tristique senectus et netus et malesuada
      fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies
      eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
      Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
    </body>
  </html>`

let request: nock.Scope
let cb: Function

describe('The markdown function', () => {
  beforeEach(async () => {
    // Stub out the test URL. In this case, a BBC article about Mount Rushmore.
    request = nock('http://www.bbc.com')
    .get('/culture/story/20160704-mount-rushmore-at-75-how-did-it-come-to-be')
    .reply(200, testHtml, {
      'content-type': 'text/html; charset=utf-8',
    })

    // Create a Sinon stub in place of Lambda's callback
    cb = stub()

    // Call handler with mocks
    let unmute: Function = mute()
    await handler(evt, {}, cb)
    unmute()
  })

  it('should retrieve the provided url', () => {
    expect(request.isDone()).to.be.true
  })

  it('should return some markdown', () => {
    expect(cb).to.have.been.calledWith(null, match({
      title: match('This is an article title'),
      content: match('Pellentesque habitant morbi tristique senectus et netus')
    }))
  })
})
