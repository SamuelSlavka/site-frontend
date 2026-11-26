import { TestBed } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

import { ModalService } from './modal.service';

class FakeComponent {
  label = 'default';
  danger = false;
}

describe('ModalService', () => {
  it('opens a centered modal and applies the initial state', () => {
    const instance = new FakeComponent();
    const open = vi.fn().mockReturnValue({ componentInstance: instance } as unknown as NgbModalRef);
    TestBed.configureTestingModule({ providers: [{ provide: NgbModal, useValue: { open } }] });

    const result = TestBed.inject(ModalService).open(FakeComponent, { initialState: { label: 'Delete?' }, size: 'lg' });

    expect(open).toHaveBeenCalledWith(FakeComponent, { centered: true, size: 'lg' });
    expect(result).toBe(instance);
    expect(result.label).toBe('Delete?');
    expect(result.danger).toBe(false);
  });
});
