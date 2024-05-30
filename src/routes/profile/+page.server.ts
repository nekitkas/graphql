import { redirect } from '@sveltejs/kit';
import { currentUserInfo } from '../../lib/queries/user.js';
import { Query } from '../../lib/helpers/query.js';

const LINK = 'https://01.kood.tech/api/graphql-engine/v1/graphql'

/** @type {import('../../../../../WebstormProjects/graphql/.svelte-kit/types/src/routes').PageServerLoad} */
export async function load(event) {
	const token = event.cookies.get('token');

	if (token === undefined) {
		redirect(303, '/signin');
	}

	return await Query(LINK, token, currentUserInfo);
}
