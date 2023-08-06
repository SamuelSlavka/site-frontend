import { Section, SectionCreate, SectionDelete } from '../models/section.model';

export namespace SectionActions {
  export class GetOne {
    static readonly type = '[Sections] Get one';
    constructor(public id: string) {}
  }
  export class Create {
    static readonly type = '[Sections] Create';
    constructor(public data: SectionCreate) {}
  }
  export class Edit {
    static readonly type = '[Sections] Edit';
    constructor(public data: SectionCreate) {}
  }
  export class Delete {
    static readonly type = '[Sections] Delete';
    constructor(public data: SectionDelete) {}
  }
}
