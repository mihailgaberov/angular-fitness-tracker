import { Subject } from 'rxjs';

export class UiService {
  loadingStateChanged = new Subject<boolean>();
}
