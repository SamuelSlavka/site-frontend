import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthenticationService } from "../../../services/authentication.service";
import { BehaviorSubject } from "rxjs";
import { ISession } from "../../../interfaces/Session";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private readonly _fb: FormBuilder, private readonly _authService: AuthenticationService) {}

  session$: BehaviorSubject<ISession> = this._authService.session;

  ngOnInit(): void {}

  form: FormGroup = this._fb.group({ username: [], password: [] });

  loginUser() {
    this._authService.loginUser(this.form.value);
  }
  logOut(): void {
    this._authService.logout();
  }
}
