import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { say, IOptions } from 'cowsay'

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

export default async function DailyCow() {

    const cowOptions: IOptions = {
        text: await getGPTResponse(),
        f: "charizardvice",
        p: true
    }

    const cow = say(cowOptions)

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