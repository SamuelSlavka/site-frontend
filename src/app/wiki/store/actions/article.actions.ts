import { Article, ArticleListItem, CreateArticle } from '../models/article.model';

export namespace ArticleActions {
  export class Get {
    static readonly type = '[Articles] Get all';
    constructor(public page: number) {}
  }
  export class GetOne {
    static readonly type = '[Articles] Get one';
    constructor(public id: string) {}
  }
  export class Create {
    static readonly type = '[Articles] Create';
    constructor(public data: CreateArticle) {}
  }
  export class Edit {
    static readonly type = '[Articles] Edit';
    constructor(public article: CreateArticle, public id: string) {}
  }
  export class Delete {
    static readonly type = '[Articles] Delete';
    constructor(public id: string) {}
  }
}
