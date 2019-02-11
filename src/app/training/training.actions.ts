import { Action } from '@ngrx/store';
import { Exercise } from './exercise.model';

export const SET_AVAILABLE_TRAININGS = '[Trainings] Set Available';
export const SET_FINISHED_TRAININGS = '[Trainings] Set Finished';
export const START_TRAINING = '[Trainings] Set Start training';
export const STOP_TRAINING = '[Trainings] Stop training';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;

  constructor(public payload: Exercise[]) {
  }
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;

  constructor(public payload: Exercise[]) {
  }
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;

  constructor(public payload: string) {
  }
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining;
