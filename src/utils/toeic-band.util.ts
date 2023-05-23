export function toeicScoreConverter(correctAnswers: number, section: 'listening' | 'reading'): number {
    if (section === 'listening') {
        const fiveBeakPoint = [28, 35, 39, 44, 47, 52, 56, 61, 74, 78, 85, 88, 93]
        const tenBreakPoint = [30, 38, 42, 46, 48, 54, 58, 63, 76, 79, 86, 89]
        let fiveBrId = 0
        let tenBrId = 0

        let baseScore = 5

        for (let i = 1; i <= correctAnswers; i++) {
            if (i <= 17) { continue }
            if (i >= 93) { continue }

            if (i <= fiveBeakPoint[fiveBrId]) {
                baseScore += 5;
                continue;
            }
            if (i <= tenBreakPoint[tenBrId]) {
                baseScore += 10;
                if (i === tenBreakPoint[tenBrId]) {
                    fiveBrId++;
                    tenBrId++;
                }
                continue;
            }
        }

        return baseScore
    }
    if (section === 'reading') {
        const fiveBeakPoint = [29, 38, 46, 48, 50, 56, 62, 70, 78, 80, 82, 85, 89, 91, 94, 96, 100]
        const tenBreakPoint = [30, 40, 47, 49, 53, 58, 63, 71, 79, 81, 83, 87, 90, 92, 95, 97]
        let fiveBrId = 0
        let tenBrId = 0

        let baseScore = 5

        for (let i = 1; i <= correctAnswers; i++) {
            if (i <= 21) { continue }
            if (i === 69 || i === 98) { continue }

            if (i <= fiveBeakPoint[fiveBrId]) {
                baseScore += 5;
                continue;
            }
            if (i <= tenBreakPoint[tenBrId]) {
                baseScore += 10;
                if (i === tenBreakPoint[tenBrId]) {
                    fiveBrId++;
                    tenBrId++;
                }
                continue;
            }
        }

        return baseScore
    }

    return 0
}