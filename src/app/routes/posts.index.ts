import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createFileRoute } from 'tanstack-angular-router-experimental'

export const Route = createFileRoute('/posts/')({
	component: () => PostsIndex,
})

@Component({
	selector: 'PostsIndex',
	template: 'Select a post',
	host: { class: 'block p-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsIndex {}
