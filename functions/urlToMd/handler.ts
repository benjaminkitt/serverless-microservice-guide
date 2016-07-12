export interface MarkdownEvent {
  url: string
}

export const handler = (event: MarkdownEvent, context: Object, cb: Function) => {
  return cb(null, {
    url: event.url
  });
};
