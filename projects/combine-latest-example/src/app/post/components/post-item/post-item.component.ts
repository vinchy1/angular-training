import { Component, input, output, signal, WritableSignal, OnInit, Signal, Input } from "@angular/core";
import { SharedModule } from "../../../shared.module";
import { Post, PostForUpdate } from "../../models/post.model";
import { FormControl, FormGroup } from "@angular/forms";

@Component({
    selector: "app-post-item",
    templateUrl: "post-item.component.html",
    imports: [SharedModule]
})
export class PostItemComponent implements OnInit {
    post = input.required<Post>();
    editId = input.required<WritableSignal<string | null>>();

    formGroup = new FormGroup({
        title: new FormControl(""),
        description: new FormControl()
    });

    onUpdate = output<PostForUpdate>();
    onDelete = output<string>();

    get editMode(): boolean {
        return this.editId()() === this.post().id;
    }

    ngOnInit() {
        this.formGroup.patchValue({...this.post()})
    }

    toggleEdit() {
        this.editId().set(this.editId()() === this.post().id ? null : this.post().id);
    }

    delete() {
        this.onDelete.emit(this.post().id);
    }

    update() {
        if (this.formGroup.invalid) return;

        this.onUpdate.emit({...this.formGroup.value, id: this.post().id} as PostForUpdate);
        this.toggleEdit();
    }
}