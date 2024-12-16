import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { AddToDoComponent } from '../add-to-do/add-to-do.component';

interface Task {
  title: string;
  description: string;
  date: string;
}

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent implements OnInit {
  todo: Task[] = [];
  inProgress: Task[] = [];
  onHold: Task[] = [];
  done: Task[] = [];

  ngOnInit(): void {
    // Load all task categories from localStorage
    const savedTodos = localStorage.getItem('todoList');
    const savedInProgress = localStorage.getItem('inProgressList');
    const savedOnHold = localStorage.getItem('onHoldList');
    const savedDone = localStorage.getItem('doneList');

    if (savedTodos) {
      this.todo = JSON.parse(savedTodos);
    }

    if (savedInProgress) {
      this.inProgress = JSON.parse(savedInProgress);
    }

    if (savedOnHold) {
      this.onHold = JSON.parse(savedOnHold);
    }

    if (savedDone) {
      this.done = JSON.parse(savedDone);
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    // Handle item movement across categories
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // Save all categories to localStorage after any change
    this.saveToLocalStorage();
  }

  constructor(private dialog: MatDialog) {}

  openAddTodoDialog(): void {
    const dialogRef = this.dialog.open(AddToDoComponent, {
      width: '500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todo.push(result);  // Add the new task to the todo list
        this.saveToLocalStorage();  // Save all categories to localStorage
      }
    });
  }

  // Save all task categories to localStorage
  saveToLocalStorage(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todo));
    localStorage.setItem('inProgressList', JSON.stringify(this.inProgress));
    localStorage.setItem('onHoldList', JSON.stringify(this.onHold));
    localStorage.setItem('doneList', JSON.stringify(this.done));
  }
}
