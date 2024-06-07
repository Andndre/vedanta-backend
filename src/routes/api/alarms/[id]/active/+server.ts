import { prismaClient } from "@/db";
import { error } from "@/response";
import { json } from "@sveltejs/kit";

export const POST = async (evt) => {
    const body = (await evt.request.json()) as {
        active: boolean;
    };
    try {
        await prismaClient.alarmDoa.update({
            where: {
                id: +evt.params.id,
                userId: evt.locals.apiUser!.id
            },
            data: {
                active: body.active
            }
        });
        return json({
            error: false,
            message: 'success'
        });
    } catch (err) {
        return error(500, 'Failed to update alarm: ' + err);
    }
}