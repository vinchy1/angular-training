import { Component, input } from "@angular/core";
import { FormControl } from "@angular/forms";
import { SharedModule } from "../../../shared.module";

@Component({
    selector: "app-quick-search",
    templateUrl: "quick-search.component.html",
    imports: [SharedModule]
})
export class QuickSearchComponent {
    search = input.required<FormControl>();
}