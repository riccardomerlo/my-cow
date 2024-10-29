import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getGPTResponseFromAPI } from "@/lib/data"
import * as cowsay from 'cowsay'
import { readFile } from "fs/promises"



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