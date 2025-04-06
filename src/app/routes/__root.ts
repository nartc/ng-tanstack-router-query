import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createRootRoute, Link, Outlet, RouterDevtools } from 'tanstack-angular-router-experimental'

export const Route = createRootRoute({
	component: () => Root,
})

@Component({
	selector: 'Root',
	template: `
		<div class="p-2 flex gap-2 text-lg">
			<a link="/" [linkActive]="{ class: 'font-bold', exact: true }">Home</a>
			<a link="/about" [linkActive]="{ class: 'font-bold', exact: true }">About</a>
		</div>
		<hr class="border-b border-slate-200" />
		<outlet />
		<RouterDevtools position="bottom-right" />
	`,
	imports: [Outlet, Link, RouterDevtools],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Root {}
