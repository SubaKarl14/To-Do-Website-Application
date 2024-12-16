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
    // Initial tasks, if any
    this.todo = [
      // { title: 'History', description: 'Study history', date: 'Dec 14, 2024 6:26 AM' },
      // { title: 'Math', description: 'Complete assignments', date: 'Dec 16, 2024 1:59 PM' }
    ];
  }

  drop(event: CdkDragDrop<Task[]>) {
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
  }

  constructor(private dialog: MatDialog) {}

  openAddTodoDialog(): void {
    const dialogRef = this.dialog.open(AddToDoComponent, {
      width: '500px',
      height: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);  // Check if the result contains the correct data
      if (result) {
        this.todo.push(result);
      }
    });
    
  }
}
