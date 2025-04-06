import { Injectable } from '@angular/core'

export interface Post {
	id: string
	title: string
	body: string
}

export class PostNotFoundError extends Error {}

@Injectable({ providedIn: 'root' })
export class PostContext {
	async getPost(postId: string) {
		console.info(`Fetching post with id ${postId}...`)
		await new Promise((r) => setTimeout(r, 500))

		const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)

		if (!response.ok) {
			if (response.status === 404) {
				throw new PostNotFoundError(`Post with id "${postId}" not found!`)
			}
			throw new Error(`Failed to fetch post with id "${postId}"`)
		}

		return (await response.json()) as Post
	}

	async getPosts() {
		console.info('Fetching posts...')
		await new Promise((r) => setTimeout(r, 500))
		const posts = (await fetch('https://jsonplaceholder.typicode.com/posts').then((r) => r.json())) as Post[]
		return posts.slice(0, 10)
	}
}
