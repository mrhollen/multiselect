import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-string-multi-select',
  templateUrl: './string-multi-select.component.html',
  styleUrls: ['./string-multi-select.component.css']
})
export class StringMultiSelectComponent implements OnInit {

  options = ['Hi', 'Bye', 'Rye'];
  model: Array<string>;

  constructor() { }

  ngOnInit() {
  }

}
