import { CreateArticle, ArticleFilter } from '../models';

export namespace ArticleActions {
  // Data Actions
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

  // UI State Actions
  export class SetPage {
    static readonly type = '[Articles UI] Set page';
    constructor(public page: number) {}
  }
  export class SetPageSize {
    static readonly type = '[Articles UI] Set page size';
    constructor(public pageSize: number) {}
  }
  export class SetSort {
    static readonly type = '[Articles UI] Set sort';
    constructor(public sortBy: 'title' | 'date' | 'author', public sortDirection: 'asc' | 'desc') {}
  }
  export class SetFilters {
    static readonly type = '[Articles UI] Set filters';
    constructor(public filters: ArticleFilter[]) {}
  }
  export class ClearFilters {
    static readonly type = '[Articles UI] Clear filters';
  }
}
