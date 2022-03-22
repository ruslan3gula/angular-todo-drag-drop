import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Todo } from '../../models/TODO.interface';

@Component({
  selector: 'todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  tasks: Todo[] = [];
  inprogress: Todo[] = [];
  done: Todo[] = [];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.todoForm = this.fb.group({ todo: ['', [Validators.minLength(3)]] });
  }

  get formControls() {
    return this.todoForm.controls;
  }

  onSubmit() {
    // const output = this.todoForm;
    const data = this.todoForm.value;
    console.log(this.todoForm.value);
    this.tasks.push({ description: data.todo, done: false });
    this.todoForm.reset();
  }

  drop(event: CdkDragDrop<Todo[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
