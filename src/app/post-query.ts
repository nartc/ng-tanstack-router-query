import { inject, Injectable } from '@angular/core'
import { queryOptions } from '@tanstack/angular-query-experimental'
import { PostContext } from './post-context'

@Injectable({ providedIn: 'root' })
export class PostQuery {
	private postContext = inject(PostContext)

	postQueryOptions(postId: string) {
		return queryOptions({
			queryKey: ['post', postId],
			queryFn: () => this.postContext.getPost(postId),
		})
	}

	postsQueryOptions() {
		return queryOptions({
			queryKey: ['posts'],
			queryFn: () => this.postContext.getPosts(),
		})
	}
}
