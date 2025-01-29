import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {
  @Input() tutorial?: Tutorial;
  @Output() refreshList: EventEmitter<any> = new EventEmitter();
  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };
  message = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.message = '';
  }

  ngOnChanges(): void {
    this.message = '';
    this.currentTutorial = { ...this.tutorial };
  }

  updatePublished(status: boolean): void {
    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, {
        published: status
      })
        .subscribe({
          next: (res) => {
            this.currentTutorial.published = status;
            this.message = res.message ?? 'Status updated successfully!';
          },
          error: (e) => console.error(e)
        });
    }
  }

  updateTutorial(): void {
    if (this.currentTutorial.id) {
      this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
        .subscribe({
          next: (res) => {
            this.message = res.message ?? 'Tutorial updated successfully!';
          },
          error: (e) => console.error(e)
        });
    }
  }

  deleteTutorial(): void {
    if (this.currentTutorial.id) {
      this.tutorialService.delete(this.currentTutorial.id)
        .subscribe({
          next: (res) => {
            this.refreshList.emit();
          },
          error: (e) => console.error(e)
        });
    }
  }
}
