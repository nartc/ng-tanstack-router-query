import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createRootRoute, Link, Outlet, RouterDevtools } from 'tanstack-angular-router-experimental'

export const Route = createRootRoute({
	component: () => Root,
	notFoundComponent: () => DefaultNotFound,
})

@Component({
	selector: 'DefaultNotFound',
	template: `
		<p>This is the notFoundComponent configured on root route</p>
		<a link="/">Start Over</a>
	`,
	host: { class: 'block p-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [Link],
})
export class DefaultNotFound {}

@Component({
	selector: 'Root',
	template: `
		<div class="p-2 flex gap-2 text-lg">
			<a link="/" [linkActive]="{ class: 'font-bold', exact: true }">Home</a>
			<a link="/posts" [linkActive]="{ class: 'font-bold' }">Posts</a>
			<a link="/about" [linkActive]="{ class: 'font-bold', exact: true }">About</a>
			<a link="/does-not-exist" [linkActive]="{ class: 'font-bold', exact: true }">Non-existent route</a>
		</div>
		<hr class="border-b border-slate-200" />
		<outlet />
		<RouterDevtools position="bottom-right" />
	`,
	imports: [Outlet, Link, RouterDevtools],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Root {}
