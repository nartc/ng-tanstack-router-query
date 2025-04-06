import { ChangeDetectionStrategy, Component } from '@angular/core'
import { createFileRoute } from 'tanstack-angular-router-experimental'

export const Route = createFileRoute('/posts/')({
	component: () => PostsIndex,
})

@Component({
	selector: 'PostsIndex',
	template: `
		<div>Select a post</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsIndex {}
