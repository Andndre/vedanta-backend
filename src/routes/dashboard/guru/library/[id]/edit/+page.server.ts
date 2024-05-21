import { prismaClient } from "@/db";
import type { PageServerLoad } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async (evt) => {

    const quiz = await prismaClient.quiz.findUnique({
        where: {
            id: +evt.params.id
        },
        select: {
            title: true
        }
    });

    if (!quiz) {
        throw error(404, 'Quiz not found');
    }

    return {
        quiz
    }
};

export const actions = {
    update: async ({ request, params }) => {
        const data = Object.fromEntries(await request.formData());

        await prismaClient.quiz.update({
            where: {
                id: +params.id
            },
            data: {
                title: data.title as string
            }
        });

        throw redirect(303, `/dashboard/library/${params.id}`);
    }
}