import { prismaClient } from "@/db";
import type { PageServerLoad } from "./$types";
import type { Prisma } from "@prisma/client";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (evt) => {
    const type = evt.url.searchParams.get('type');

    return {
        type
    }
};

export const actions = {
    save: async (evt) => {
        const data = Object.fromEntries(await evt.request.formData());
        await prismaClient.quizEntry.create({
            data: {
                questionModel: data as Prisma.JsonObject,
                scoreCorrect: 5,
                quizId: +evt.params.id
            }
        })

        throw redirect(303, `/dashboard/library/${evt.params.id}/`)
    }
}
