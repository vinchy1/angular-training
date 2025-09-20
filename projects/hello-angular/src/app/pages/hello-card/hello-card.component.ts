import { Component, input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-hello-card',
    templateUrl: './hello-card.component.html',
    styleUrls: ['./hello-card.component.scss'],
    imports: [CommonModule]
})
export class HelloCardComponent {
    cardIndex = input.required<number>();
}
