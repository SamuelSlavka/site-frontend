import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";
import { ApiLoaderInterceptor } from "./interceptors/api-loader.interceptor";
import { ApiPrefixInterceptor } from "./interceptors/api-prefix.interceptor";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import { GoogleLoginProvider, SocialAuthServiceConfig } from "@abacritt/angularx-social-login";
import { ToastrModule } from "ngx-toastr";
import { RootStoreModule } from "../root-store";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    RootStoreModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiLoaderInterceptor,
      multi: true,
    },

    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              "338179295505-7im0prahsgculr64vspgntnq1gpgnn3t.apps.googleusercontent.com",
              {
                scopes: "email",
              },
            ),
          },
        ],
        onError: (err) => {
          console.error(err);
        },
      } as SocialAuthServiceConfig,
    },
  ],
})
export class CoreModule {}
