import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { SessionStoreSelectors, SessionStoreActions } from "../../../auth-store";
import { SessionState } from "../../../auth-store/reducer";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private readonly _fb: FormBuilder, readonly _store: Store) {}

  session$: Observable<SessionState | null> = this._store.select(SessionStoreSelectors.selectSession);

  ngOnInit(): void {}

  form: FormGroup = this._fb.group({ username: [], password: [] });

  loginUser() {
    this._store.dispatch(SessionStoreActions.UserLoginRequestAction(this.form.value));
  }
  logOut(): void {
    this._store.dispatch(SessionStoreActions.LogoutRequestAction());
  }
}
