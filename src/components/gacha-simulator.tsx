'use client';
import Test from "public/background_image.png";
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from "./ui/card";
import { useState } from "react";
import { Button } from "./ui/button";

interface Rewards {
    id: number,
    name: string,
    rarity: number,
    color: string,
    image: string
}

const getRewardImage = (image: number) => {
    switch(image) {
        case 3:
            return "/samsoc_keychain.png"
        case 1:
            return "/samsoc_bw_stickers.png"
        case 2:
            return "/samsoc_colour_stickers.png"
    }
}

const rewards: Rewards[] = [
    {
        id: 1,
        name: "Sticker",
        rarity: 3,
        image: "ur mother",
        color: "text-blue-500"
    },
    {
        id: 2,
        name: "Coloured Sticker",
        rarity: 4,
        image: "ur mother",
        color: "text-purple-500"
    },
    {
        id: 3,
        name: "Keychain",
        rarity: 5,
        image: "ur mother",
        color: "text-red-500"
    }
]

export default function GachaSim() {
    const [pulledRewards, setPulledRewards] = useState<Rewards[]>([])
    const [showResults, setShowResults] = useState(false)
    const [isWishing, setIsWishing] = useState(false)
    const [videoType, setVideoType] = useState(0);

    const performGacha = (count: 1) => {
        const fucktheerror = {
            id: 3,
            name: "Keychain",
            rarity: 5,
            image: "ur mother",
            color: "text-red-500"
        }

        setIsWishing(true);
        let pullKeychain = true;
        const newPulls: Rewards[] = []

        for (let i=0; i<count; i++) {
            let pulledReward: Rewards
            
            if (Math.random() < 0.125 && pullKeychain)  {
                const fiveStars = rewards.filter((c) => c.rarity === 5)
                pulledReward = fiveStars[Math.floor(Math.random() * fiveStars.length)] ?? fucktheerror
                pullKeychain = false;
            } else if (Math.random() < 0.51) {
                const fourStars = rewards.filter((c) => c.rarity === 4)
                pulledReward = fourStars[Math.floor(Math.random() * fourStars.length)] ?? fucktheerror
            } else {
                const threeStars = rewards.filter((c) => c.rarity === 3)
                pulledReward = threeStars[Math.floor(Math.random() * threeStars.length)] ?? fucktheerror
            }
            newPulls.push(pulledReward)
        }
        let highest = 0;
        for (let i=0; i<count; i++) {
                if (highest < (newPulls[i]?.id ?? 0)) {
                    highest = newPulls[i]?.id ?? 0;
                }
        }
        setVideoType(highest)
        setPulledRewards(newPulls)

        setTimeout(() => {
            setIsWishing(false)
            setShowResults(true)
        }, 7300)
    }

    const closeResults = () => {
        setShowResults(false)
        setPulledRewards([])
    }

    if (!showResults) {
        if (!isWishing) {
            return (
                <div>
                    <Image src={Test}
                        width={1920}
                        height={1080}
                        alt="Picture of banner">
                    </Image>
                    <Button
                        onClick={() => performGacha(1)}
                        disabled={isWishing}
                        className="absolute bottom-1 right-1 h-12 w-52 bg-amber-50 hover:bg-amber-100 rounded-4xl border-amber-400 border-2"
                        >
                        <div className="text-xs opacity-80 drop-shadow-sm text-black font-bold font-sans">Wish x2<br></br>⭐x2</div>
                    </Button>
                </div>
            )
        } else {
            return  (
                <div>
                    {
                        videoType===3 && 
                        (
                            <video autoPlay={true} muted>
                                    <source src="/fivestar.mp4" type="video/mp4"/>
                            </video>
                        )
                    }
                    {
                        videoType===2 && 
                        (
                            <video autoPlay={true} muted>
                                    <source src="/fourstar.mp4" type="video/mp4"/>
                            </video>
                        )
                    }
                    {
                        videoType===1 && 
                        (
                            <video autoPlay={true} muted>
                                    <source src="/threestar.mp4" type="video/mp4"/>
                            </video>
                        )
                    }
                </div>
            )
        }
    } else {
        return (
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row gap-4">
                    {pulledRewards.map((character, index) => (
                        <div key={index}>
                            <Card className="bg-linear-to-b to-cyan-900 from-indigo-200 shadow-2xl shadow-cyan-500/50">
                                <CardHeader>
                                    <p className={character.color + " font-bold text-2xl text-center drop-shadow-lg"}>{character.name}</p>
                                </CardHeader>
                                <CardContent>
                                    <Image src={getRewardImage(character.id) ?? '/placeholder.png'} width={200} height={200} alt="keychain"></Image>
                                </CardContent>
                            </Card>
                            <br></br>
                        </div>
                    ))}
                </div>
                <Button 
                    className="bg-red-500 hover:bg-red-600"
                    onClick={() => closeResults()}
                >
                    Go Back
                </Button>   
            </div>
        )
    }

}
