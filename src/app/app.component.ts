import { Component } from '@angular/core'
import { RouterRoot } from 'tanstack-angular-router-experimental'

@Component({
	selector: 'app-root',
	imports: [RouterRoot],
	template: `
		<RouterRoot />
	`,
})
export class AppComponent {}
