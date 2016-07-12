declare module "node-readability" {
  function readability(url: string, callback: (err: Error, article: readability.ReadableArticle) => any): void;
  namespace readability {
    export interface ReadableArticle {
      title: string,
      content: string,
      close: Function
    }
  }
  export = readability
}
