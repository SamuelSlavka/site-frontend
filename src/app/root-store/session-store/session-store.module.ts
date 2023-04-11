import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SessionStoreEffects } from "./effects";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { sessionReducer } from "./reducer";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature("session", sessionReducer),
    EffectsModule.forFeature([SessionStoreEffects]),
  ],

  providers: [SessionStoreEffects],
})
export class SessionStoreModule {}
