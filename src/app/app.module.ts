import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app.routes";
import { LoginComponent } from "./auth/login/login.component";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { NgIconsModule } from "@ng-icons/core";
import { heroEye, heroLockClosed } from '@ng-icons/heroicons/outline';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}