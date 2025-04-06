import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createFileRoute } from 'tanstack-angular-router-experimental'

export const Route = createFileRoute('/')({
	component: () => Index,
})

@Component({
	selector: 'Index',
	template: `
		<p>Welcome to TanStack Router for Angular!</p>
		<p>
			This is the index route. You can add more routes in the
			<code>src/app/routes</code>
			folder.
		</p>
	`,
	host: { class: 'block p-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Index {}
