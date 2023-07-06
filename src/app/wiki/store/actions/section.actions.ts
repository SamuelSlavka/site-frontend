import { Section, SectionCreate } from '../models/section.model';

export namespace SectionActions {
  export class FetchOne {
    static readonly type = '[Sections] Fetch one';
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
  export class Remove {
    static readonly type = '[Sections] Remove';
    constructor(public id: string) {}
  }
}
