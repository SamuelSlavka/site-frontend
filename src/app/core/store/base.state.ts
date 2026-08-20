import { StateContext } from '@ngxs/store';
import { Observable, catchError, of, tap } from 'rxjs';
import { ToastService } from '@core/services/toast.service';

/**
 * Base class for all NGXS states with common async/error handling patterns.
 * Extends to reduce code duplication across multiple states.
 *
 * Provides:
 * - Consistent loading state management
 * - Unified error handling with toast notifications
 * - Immutable state patching
 */
export abstract class BaseState<T extends { loading: boolean; error: string | null }> {
  protected abstract readonly toastr: ToastService;

  /**
   * Wraps an async action with automatic loading/error state management.
   * Call this from your @Action handler.
   *
   * @example
   * @Action(MyActions.FetchData)
   * fetchData(ctx: StateContext<MyStateModel>, action: MyActions.FetchData) {
   *   return this.handleAsyncAction(
   *     ctx,
   *     () => this.service.getData(),
   *     'Failed to fetch data'
   *   );
   * }
   */
  protected handleAsyncAction<U>(
    ctx: StateContext<T>,
    action: () => Observable<U>,
    errorMsg: string,
  ): Observable<U> {
    this.setLoading(ctx, true);
    return action().pipe(
      tap(() => this.setLoading(ctx, false)),
      catchError((error) => {
        this.handleError(ctx, errorMsg);
        return of(error);
      }),
    );
  }

  /**
   * Wraps an async action that includes a transformation step.
   *
   * @example
   * @Action(MyActions.FetchAndTransform)
   * fetchData(ctx: StateContext<MyStateModel>) {
   *   return this.handleAsyncActionWithTransform(
   *     ctx,
   *     () => this.service.getData(),
   *     (result) => ctx.patchState({ data: transform(result) }),
   *     'Failed to fetch data'
   *   );
   * }
   */
  protected handleAsyncActionWithTransform<U>(
    ctx: StateContext<T>,
    action: () => Observable<U>,
    transform: (result: U) => void,
    errorMsg: string,
  ): Observable<U> {
    this.setLoading(ctx, true);
    return action().pipe(
      tap((result) => {
        transform(result);
        this.setLoading(ctx, false);
      }),
      catchError((error) => {
        this.handleError(ctx, errorMsg);
        return of(error);
      }),
    );
  }

  /**
   * Set loading state and clear any previous errors.
   */
  protected setLoading(ctx: StateContext<T>, loading: boolean): void {
    ctx.patchState({ loading, ...(loading ? { error: null } : {}) } as Partial<T>);
  }

  /**
   * Handle error by setting error state, showing toast, and logging.
   */
  protected handleError(ctx: StateContext<T>, errorMsg: string): void {
    ctx.patchState({ loading: false, error: errorMsg } as Partial<T>);
    this.toastr.error(errorMsg);
    console.error(errorMsg);
  }

  /**
   * Clear error state (e.g., on retry).
   */
  protected clearError(ctx: StateContext<T>): void {
    ctx.patchState({ error: null } as Partial<T>);
  }
}
