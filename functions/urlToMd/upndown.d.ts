declare module "upndown" {
  class upndown{
    convert(source: string, callback: (err: Error, markdown: string) => any): void;
  }
  namespace upndown {}
  export = upndown
}
