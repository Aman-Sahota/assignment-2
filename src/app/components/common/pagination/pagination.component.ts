import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  isLoading: boolean = false;
  pages: number[] = [];
  currentPage: number = 1;
  limit: number = 10;
  limitValues: number[] = [];
  showLimit: boolean = false;

  private _data: any[] = [];

  @Input()
  public set data(v: any[]) {
    this._data = v;
    this.buildLimitValues();
    this.buildTable();
  }
  public get data(): any[] {
    return this._data;
  }

  @Output() slicedData = new EventEmitter();

  constructor() {}

  buildTable() {
    this.isLoading = true;
    let pagesArr = [];
    let noOfPages = Math.ceil(this.data.length / this.limit);
    for (let index = 0; index < noOfPages; index++) {
      pagesArr.push(index + 1);
    }
    this.pages = pagesArr;
    this.emitSlicedData();
  }

  buildLimitValues() {
    if (this.data.length === 0) {
      return;
    }

    let values = [5, 10, 50, 100, 500, 1000];
    values.map((value) => {
      if (value <= this.data.length) {
        this.limitValues.push(value);
      }
    });
  }

  setPage(page: number) {
    this.currentPage = page;
    this.emitSlicedData();
  }

  emitSlicedData() {
    const start = (this.currentPage - 1) * this.limit;
    const end = start + this.limit;
    this.slicedData.emit(this._data.slice(start, end));
    this.isLoading = false;
  }

  previousPage() {
    this.currentPage -= 1;
    this.emitSlicedData();
  }

  nextPage() {
    this.currentPage += 1;
    this.emitSlicedData();
  }

  setLimit(value: number) {
    this.limit = value;
    this.toggleLimitDropdown();
    this.buildTable();
  }

  toggleLimitDropdown() {
    this.showLimit = !this.showLimit;
  }
}
