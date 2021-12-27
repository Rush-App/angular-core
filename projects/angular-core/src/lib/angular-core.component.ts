import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-angular-core',
  template: `
    <p>
      angular-core works!
    </p>
  `,
  styles: [
  ]
})
export class AngularCoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
