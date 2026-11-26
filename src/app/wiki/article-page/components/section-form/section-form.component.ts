import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { RevisionDto } from '@app/wiki/store/models/revision.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SectionFormComponent implements OnInit, AfterViewInit {
  private activeModal = inject(NgbActiveModal);
  private fb = inject(FormBuilder);

  @ViewChild('textArea') textArea?: ElementRef<HTMLTextAreaElement>;

  isEdit = false;
  initData?: RevisionDto;
  public onClose = new Subject<RevisionDto>();

  form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    text: ['', Validators.required],
  });

  ngOnInit() {
    this.form.setValue({ title: this.initData?.title ?? '', text: this.initData?.text ?? '' });
  }

  ngAfterViewInit() {
    if (this.textArea) {
      this.autoResize(this.textArea.nativeElement);
    }
  }

  save() {
    if (this.form.invalid) {
      return;
    }
    this.onClose.next(this.form.getRawValue());
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.dismiss();
  }

  autoResize(textArea: HTMLTextAreaElement) {
    textArea.style.height = '';
    textArea.style.height = `${textArea.scrollHeight + 2}px`;
  }
}
