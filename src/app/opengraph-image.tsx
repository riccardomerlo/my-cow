import { ImageResponse } from 'next/og'

import * as cowsay from 'cowsay'
import { getGPTResponseFromAPI } from '@/lib/data'

export const runtime = 'edge'

export const alt = 'About Acme'
export const size = {
    width: 400,
    height: 220,
}
export const contentType = 'image/png'



export default async function Image() {

    const cowOptions: cowsay.IOptions = {
        text: await getGPTResponseFromAPI(),
        f: "charizardvice",
        p: true
    }

    const cow = cowsay.say(cowOptions)


    const geistMono = fetch(
        new URL('./fonts/IBMPlexMono-Regular.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer())

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 14,
                    background: 'white',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    whiteSpace: 'pre-wrap',
                }}
            >

                {cow}

            </div >
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Plex',
                    data: await geistMono,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    )
}