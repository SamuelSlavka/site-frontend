import { Injectable, Type, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface ModalConfig<T> {
  /** Properties assigned to the component instance before its first change detection. */
  initialState?: Partial<T>;
  size?: 'sm' | 'lg' | 'xl';
}

/** Opens a component in a centered ng-bootstrap modal and returns the component instance. */
@Injectable({ providedIn: 'root' })
export class ModalService {
  private ngbModal = inject(NgbModal);

  open<T>(component: Type<T>, config: ModalConfig<T> = {}): T {
    const ref = this.ngbModal.open(component, { centered: true, size: config.size });
    Object.assign(ref.componentInstance, config.initialState);
    return ref.componentInstance;
  }
}
