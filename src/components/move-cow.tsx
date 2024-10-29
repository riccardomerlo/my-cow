"use client"

import { useEffect, useState } from "react"


function animateCow(cow: string, frames = 12, maxShift = 5) {
    // Define the different leg positions we want to cycle through
    const legPositions = [
        { leg1: "||", leg2: "||" },
        { leg1: "/|", leg2: "/|" },
        { leg1: "//", leg2: "//" },
        { leg1: "||", leg2: "||" }
    ];

    const cowLines = cow.trim().split("\n"); // Split cow into lines for reference
    const animatedFrames = [];
    const numLegPositions = legPositions.length;

    // Function to locate the leg positions dynamically
    function findLegPositions(lines: string[]) {
        const positions: { lineIndex: number; startIndex: number }[] = [];
        lines.forEach((line, lineIndex) => {
            const legIndex = line.indexOf("||");
            if (legIndex !== -1) {
                positions.push({ lineIndex, startIndex: legIndex });
            }
        });
        return positions;
    }

    // Get initial leg positions dynamically
    const baseLegPositions = findLegPositions(cowLines);

    for (let i = 0; i < frames; i++) {
        const shift = Math.abs((i % (2 * maxShift)) - maxShift); // Create wave-like horizontal movement
        const currentLegs = legPositions[i % numLegPositions]; // Select leg positions for this frame
        const modifiedCowLines = [...cowLines]; // Copy cow lines for modification

        // Apply the leg positions to the dynamically found locations
        baseLegPositions.forEach((pos, index) => {
            const line = modifiedCowLines[pos.lineIndex];
            const newLeg = index === 0 ? currentLegs.leg1 : currentLegs.leg2;
            modifiedCowLines[pos.lineIndex] =
                line.substring(0, pos.startIndex) + newLeg + line.substring(pos.startIndex + 2); // Replace 2 characters
        });

        // Apply the horizontal shift by padding each line
        const shiftedCow = modifiedCowLines.map(line => " ".repeat(shift) + line).join("\n");
        animatedFrames.push(shiftedCow);
    }

    return animatedFrames;
}






export default function MoveCow({ cow: initialCow }: { cow: string }) {
    const [cow, setCow] = useState<string>(initialCow);
    const [frameIndex, setFrameIndex] = useState<number>(0);

    // Generate frames once using the initial cow state
    const frames = animateCow(initialCow, 20, 8);

    useEffect(() => {
        const interval = setTimeout(() => {
            setFrameIndex((prevIndex) => (prevIndex + 1) % frames.length);
            setCow(frames[frameIndex]);
        }, 200);

        // Clean up timeout on component unmount
        return () => clearTimeout(interval);
    }, [frameIndex, frames]);

    return (
        <pre className="font-mono text-sm whitespace-pre-wrap">
            {cow}
        </pre>
    );
}