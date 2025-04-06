import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { injectQuery, QueryClient } from '@tanstack/angular-query-experimental'
import { createFileRoute, Link, Outlet } from 'tanstack-angular-router-experimental'
import { PostQuery } from '../post-query'

export const Route = createFileRoute('/posts')({
	component: () => PostsLayout,
	loader: () => {
		const queryClient = inject(QueryClient)
		const postQuery = inject(PostQuery)
		return queryClient.ensureQueryData(postQuery.postsQueryOptions())
	},
})

@Component({
	selector: 'PostsLayout',
	template: `
		@if (postsQueryResult.isPending()) {
			<p>Loading posts...</p>
		} @else if (postsQueryResult.isError()) {
			<p>Failed to load posts.</p>
			<p>Error: {{ postsQueryResult.error().message }}</p>
		} @else {
			<ul class="list-disc pl-4">
				@for (post of postsQueryResult.data(); track post.id) {
					<li class="whitespace-nowrap">
						<a
							[link]="{
								to: '/posts/$postId',
								params: { postId: post.id },
								activeProps: { class: 'font-bold underline' },
							}"
							class="block py-1 text-blue-600 hover:opacity-75"
						>
							{{ post.title.substring(0, 20) }}
						</a>
					</li>
				}
				<li class="whitespace-nowrap">
					<a
						[link]="{
							to: '/posts/$postId',
							params: { postId: 'i-do-not-exist' },
							activeProps: { class: 'font-bold underline' },
						}"
						class="block py-1 text-blue-600 hover:opacity-75"
					>
						Non-existent Post
					</a>
				</li>
			</ul>
			<hr class="border-b border-slate-200" />
			<outlet />
		}
	`,
	host: { class: 'flex p-2 gap-2' },
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [Link, Outlet],
})
export class PostsLayout {
	private postQuery = inject(PostQuery)
	protected postsQueryResult = injectQuery(() => this.postQuery.postsQueryOptions())
}
