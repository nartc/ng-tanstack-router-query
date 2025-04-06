import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createFileRoute } from 'tanstack-angular-router-experimental'

export const Route = createFileRoute('/about')({
	component: () => About,
})

@Component({
	selector: 'About',
	template: `
		<p>Hello /about!</p>
	`,
	host: { class: 'block p-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class About {}
