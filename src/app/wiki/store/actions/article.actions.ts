import { Article, ArticleListItem, CreateArticle } from '../models/article.model';

export namespace ArticleActions {
  export class Fetch {
    static readonly type = '[Articles] Fetch all';
    constructor(public page: number) {}
  }
  export class FetchOne {
    static readonly type = '[Articles] Fetch one';
    constructor(public id: string) {}
  }
  export class Create {
    static readonly type = '[Articles] Create';
    constructor(public data: CreateArticle) {}
  }
  export class Edit {
    static readonly type = '[Articles] Edit';
    constructor(public article: ArticleListItem) {}
  }
  export class Remove {
    static readonly type = '[Articles] Remove';
    constructor(public id: string) {}
  }
}
