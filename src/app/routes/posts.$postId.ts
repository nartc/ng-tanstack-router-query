import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental'
import {
	createFileRoute,
	DefaultError,
	ERROR_COMPONENT_CONTEXT,
	injectRouter,
} from 'tanstack-angular-router-experimental'
import { PostNotFoundError } from '../post-context'
import { PostQuery } from '../post-query'

export const Route = createFileRoute('/posts/$postId')({
	component: () => Post,
	errorComponent: () => PostError,
	loader: async ({ params: { postId } }) => {
		const queryClient = inject(QueryClient)
		const postQuery = inject(PostQuery)
		return await queryClient.ensureQueryData(postQuery.postQueryOptions(postId))
	},
})

@Component({
	selector: 'PostError',
	template: `
		@if (notFoundError) {
			<p>Post not found: {{ notFoundError }}</p>
		} @else {
			<button (click)="router.invalidate()">retry</button>
			<DefaultError />
		}
	`,
	host: { class: 'block p-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [DefaultError],
})
export class PostError {
	protected router = injectRouter()
	protected errorContext = inject(ERROR_COMPONENT_CONTEXT)

	protected notFoundError =
		this.errorContext.error instanceof PostNotFoundError ? this.errorContext.error.message : null
}

@Component({
	selector: 'Post',
	template: `
		<!-- we don't use isPending() or isError() here because we will not run into those cases in the component -->
		<!-- The loader ensures that the data is available. If there's pending, then the Route shows pendingComponent -->
		<!-- If there's an error, then the Route shows errorComponent -->

		<h4 class="text-xl font-bold underline">{{ postQueryResult.data()?.title }}</h4>
		<div class="text-sm">{{ postQueryResult.data()?.body }}</div>
	`,
	host: { class: 'block space-y-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Post {
	private params = Route.params()

	private postQuery = inject(PostQuery)
	protected postQueryResult = injectQuery(() => this.postQuery.postQueryOptions(this.params().postId))
}
