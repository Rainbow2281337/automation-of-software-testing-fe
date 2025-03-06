import { Component, EventEmitter, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  /**
   * Emits search input value
   *
   * @memberof SearchBarComponent
   */
  @Output() search = new EventEmitter<string>();

  /**
   * Subject to debounce search input
   *
   * @private
   * @memberof SearchBarComponent
   */
  private readonly searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(500))
      .subscribe((value) => this.search.emit(value));
  }

  /**
   * Handles search input
   *
   * @param event - input event
   * @memberof SearchBarComponent
   */
  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }
}
