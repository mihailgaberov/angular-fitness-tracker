import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../training.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Exercise } from '../exercise.model';
import { UiService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})


export class NewTrainingComponent implements OnInit {
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private uiService: UiService,
              private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
