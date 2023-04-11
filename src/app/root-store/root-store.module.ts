import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SessionStoreModule } from "./session-store/session-store.module";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../../enviroments/enviroment";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    SessionStoreModule,
  ],
})
export class RootStoreModule {}
