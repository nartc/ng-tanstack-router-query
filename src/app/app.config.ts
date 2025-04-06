import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core'
import { createRouter, provideRouter } from 'tanstack-angular-router-experimental'
import { routeTree } from '../routeTree.gen'

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
})

declare module 'tanstack-angular-router-experimental' {
	interface Register {
		router: typeof router
	}
}

export const appConfig: ApplicationConfig = {
	providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(router)],
}
