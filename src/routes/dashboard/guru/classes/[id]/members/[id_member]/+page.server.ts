import { prismaClient } from '@/db';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async (evt) => {
	const user = await prismaClient.user.findUnique({
		where: {
			id: evt.params.id_member
		},
		include: {
			discussionsCreated: {
				orderBy: {
					likesCount: 'desc'
				}
			},
			DiscussionReply: {
				orderBy: {
					likesCount: 'desc'
				},
				include: {
					discussion: {
						select: {
							title: true
						}
					}
				},
				where: {
					discussionReplyId: null
				}
			}
		}
	});

	if (!user) {
		throw error(404, 'User not found');
	}

	return {
		user
	};
};
