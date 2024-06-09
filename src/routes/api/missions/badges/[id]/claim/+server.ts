import { prismaClient } from '@/db.js';
import { LencanaType } from '@/mission.js';
import { json } from '@sveltejs/kit';

export const GET = async (evt) => {
    const { id } = evt.params;

    const user = await prismaClient.user.findUnique({
        where: {
            id: evt.locals.apiUser!.id
        },
        select: {
            id: true,
            points: true,
            activeStreak: true,
            stagesCompleted: true,
            ganeshBotMessages: true,
            discussionsAnswered: true
        }
    });

    const badge = await prismaClient.badge.findUnique({
        where: {
            id: +id,
        },
        select: {
            id: true,
            type: {
                select: {
                    id: true
                }
            },
            parameter: true,
        }
    });

    if (!badge) {
        throw new Error('Badge not found');
    }

    if (!user) {
        throw new Error('User not found');
    }

    let progress = 0;
    switch (badge.type.id) {
        case LencanaType.HADIR_BERTURUT_TURUT:
            progress = user!.activeStreak;
            break;
        case LencanaType.MENYELESAIKAN_STAGE:
            progress = user!.stagesCompleted;
            break;
        case LencanaType.MENJAWAB_DISKUSI:
            progress = user!.discussionsAnswered;
        case LencanaType.MENGIRIM_PESAN_GANESH_BOT:
            progress = user!.ganeshBotMessages;
            break;
        default:
            break;
    }

    if (progress < badge.parameter) {
        throw new Error('Not enough progress');
    }


    await prismaClient.userBadge.create({
        data: {
            userId: evt.locals.apiUser!.id,
            badgeId: +id
        }
    });

    return json({ id });
}
