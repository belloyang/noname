import { Component, OnInit } from '@angular/core';
import { Versions } from '../../environments/versions';

@Component({
  selector: 'bc-about',
  template: `
  <div>
    <p>
      Version: {{Versions.version}}
    </p>
    <p>
      Revision: {{Versions.revision}}
    </p>
    <p>
      Branch: {{Versions.branch}}
    </p>
    </div>
  `,
  styles: [],
})
export class AboutComponent implements OnInit {
  Versions: any = Versions;
  constructor() {}

  ngOnInit() {}
}
