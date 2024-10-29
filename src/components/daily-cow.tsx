import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSecondsUntilMidnight } from "@/lib/utils"
import * as cowsay from 'cowsay'
import { readFile } from "fs/promises"



// Simulated GPT API call
const getGPTResponse = async () => {
    // In a real scenario, this would be an actual API call
    const responses = [
        "Moo-ve over, I'm the cow of the day!",
        "Have an udderly fantastic day!",
        "Don't have a cow, man!",
        "I'm in the moo-d for some fun!",
        "Steer clear of negativity today!"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
}

// use fetch to make a request to the GPT API
const getGPTResponseFromAPI = async () => {

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `
                Directly provide the answer to the user request. Return the answer inside double quotes.
                Example: 
                User: "Write a motivational quote" 
                Answer: "It is better to fail in originality than to succeed in imitation."
                `,
                    },
                    {
                        role: "user",
                        content: `You are an Italian cow. Keep in mind that as a good cow you have to Moospeak. Write a motivation quote in Italian. Be creative! 
                        Sometimes you may hit your head and think you are another kind of animal, like a parrot... or a pirate arggh! Maybe even a poet!
                        Well... nobody is perfect! At least you are funny!`,
                    },
                ],
                temperature: 0.7,
                max_tokens: 100
            }),
            next: {
                revalidate: getSecondsUntilMidnight()
                // tags: ['quote'] 
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        // console.log("Response from OpenAI:", data);
        return String(data.choices[0].message.content.replace(/"/g, ''))
    } catch (error) {
        console.error("Error fetching data from OpenAI API:", error);
        return await getGPTResponse()
    }

}

const readCowOfTheDay = async () => {
    // read from the file in ./data/cow-of-the-day.txt and return the content

    const filePath = process.cwd() + '/data/cow-of-the-day.txt'
    const fileContent = await readFile(filePath, 'utf8')
    return fileContent
}


export default async function DailyCow() {

    const cowOptions: cowsay.IOptions = {
        text: await getGPTResponseFromAPI(),
        f: "charizardvice",
        p: true
    }

    const cow = cowsay.say(cowOptions)

    return (
        <Card className="w-full max-w-3xl mx-auto mt-8 flex flex-col items-center justify-center gap-4">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">Cow of the Day</CardTitle>
            </CardHeader>
            <CardContent>
                <pre className="font-mono text-sm whitespace-pre-wrap">
                    {cow}
                </pre>
            </CardContent>
        </Card>
    )
}