export const prerender = false;
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: import.meta.env.OPENAI_API_KEY,
});

// console.log('API Key:', import.meta.env.OPENAI_API_KEY);
export async function POST({ request }) {
    const { word, language } = await request.json();

    const prompt = `Actua como con profesional de la traduccion y treduceme esta frase al idioma objetivo:
        Frase: "${word}"
        Idioma objetivo: "${language}"
        Traducción:`;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: prompt }],
        });

        const translation = completion.choices[0].message.content.trim();

        return new Response(JSON.stringify({ translation }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
