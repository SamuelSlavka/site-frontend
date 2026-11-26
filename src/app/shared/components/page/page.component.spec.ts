import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  template: `
    <app-page title="Wiki" subtitle="Notes" backLink="/dashboard" backLabel="Home">
      <button pageActions>Action</button>
      <p class="content">Body</p>
    </app-page>
  `,
  imports: [SharedModule],
})
class HostComponent {}

describe('PageComponent', () => {
  it('renders the header, back link, projected actions and content', async () => {
    await TestBed.configureTestingModule({ imports: [HostComponent] }).compileComponents();
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
    const el = fixture.nativeElement as HTMLElement;

    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Wiki');
    expect(el.querySelector('.page-subtitle')?.textContent?.trim()).toBe('Notes');
    expect(el.querySelector('.back-link')?.getAttribute('href')).toBe('/dashboard');
    expect(el.querySelector('.page-actions button')?.textContent).toBe('Action');
    expect(el.querySelector('.content')).not.toBeNull();
  });
});
