import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { AuthApiEffects } from "./auth.effects";
import { LoginPageComponentModule } from "./components/login-page";
import { UserComponentModule } from "./components/user";

@NgModule({
  imports: [EffectsModule.forFeature([AuthApiEffects])],
  exports: [LoginPageComponentModule, UserComponentModule],
})
export class AuthModule {}
