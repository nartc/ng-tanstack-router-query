import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { provideTanStackQuery, QueryClient, withDevtools } from '@tanstack/angular-query-experimental'
import { createRouter, provideRouter } from 'tanstack-angular-router-experimental'
import { routeTree } from '../routeTree.gen'

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	// Since we're using Tanstack Query, we don't want loader calls to ever be stale
	// This will ensure that the loader is always called when the route is preloaded or visited
	defaultPreloadStaleTime: 0,
})

declare module 'tanstack-angular-router-experimental' {
	interface Register {
		router: typeof router
	}
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideRouter(router),
		provideTanStackQuery(
			new QueryClient(),
			withDevtools(() => ({ buttonPosition: 'top-right' })),
		),
	],
}
