import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as UI from '../shared/ui.actions';
import * as Training from '../training/training.actions';
import * as fromTraining from '../training/training.reducer';

@Injectable()
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private runningExercise: Exercise;
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore, private uiService: UiService, private store: Store<fromTraining.TrainingState>) {
  }

  fetchAvailableExercises() {
    this.uiService.loadingStateChanged.next(true);
    this.fbSubs.push(this.db.collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: (doc.payload.doc.data() as Exercise).name,
            duration: (doc.payload.doc.data() as Exercise).duration,
            calories: (doc.payload.doc.data() as Exercise).calories
          };
        });
      })).subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
      }, error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);
        this.exercisesChanged.next(null);
      }));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.store.dispatch(new Training.StopTraining());
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new Training.SetFinishedTrainings(exercises));
    }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
