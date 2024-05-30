import { redirect } from '@sveltejs/kit';
import { getXp, xpByEvent, xpTotal } from '../lib/queries/xp';
import { Query } from '../lib/helpers/query';
import { currentUserInfo } from '../lib/queries/user';
import { auditRatio, auditRatioTotal } from '../lib/queries/audits';
import toast from 'svelte-french-toast';
import type { LoadResult } from '../lib/types/types';

let url = 'https://01.kood.tech/api/graphql-engine/v1/graphql'


export async function load({ cookies }) {
	const result: LoadResult = {
		user: null,
		auditRatio: 0,
		auditRatioUp: 0,
		auditRatioDown: 0,
		userXpByEvent: 0,
		userXpTotal: 0,
		skills: []
	};
	const token = cookies.get('token');

	if (token === undefined) {
		redirect(303, '/signin');
	}

	const userResp = await Query(url, token, currentUserInfo);
	const userAuditTotal = await Query(url, token, auditRatioTotal);
	const userAuditUp = await Query(url, token, auditRatio('up'));
	const userAuditDown = await Query(url, token, auditRatio('down'));
	const userXpByEvent = await Query(url, token, xpByEvent(148));
	const userXpTotal = await Query(url, token, xpTotal(148));

	const userXpSkills = await Query(url, token, getXp());

	result.user = userResp.data.user[0];
	result.auditRatio = userAuditTotal.data.user[0].auditRatio;
	result.auditRatioUp = userAuditUp.data.transaction_aggregate.aggregate;
	result.auditRatioDown = userAuditDown.data.transaction_aggregate.aggregate;
	result.userXpByEvent = userXpByEvent.data.user[0].xps;
	result.userXpTotal = userXpTotal.data;
	result.skills = userXpSkills?.data?.transaction;
	return result;
}

export const actions = {
	signout: async ({ cookies }) => {
		cookies.delete('token', { path: '/', secure: true, sameSite: 'strict' });
		toast.success('Success!');

		throw redirect(303, '/');
	}
};
