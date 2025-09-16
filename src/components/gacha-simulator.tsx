'use client';
import Test from "public/image.png";
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { useState } from "react";
import { Button } from "./ui/button";
import bgvideo from "../videos/fivestar.mp4"

interface Rewards {
    id: number,
    name: string,
    rarity: number,
    color: string,
    image: string
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
        name: "Colored Sticker",
        rarity: 4,
        image: "ur mother",
        color: "text-amber-500"
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

    const performGacha = (count: 3) => {
        setIsWishing(true);
        let pullKeychain = true;
        const newPulls: Rewards[] = []

        for (let i=0; i<count; i++) {
            let pulledReward: Rewards
            console.log(pullKeychain)
            
            if (Math.random() < 0.065 && pullKeychain)  {
                const fiveStars = rewards.filter((c) => c.rarity === 5)
                pulledReward = fiveStars[Math.floor(Math.random() * fiveStars.length)]
                pullKeychain = false;
            } else if (Math.random() < 0.51) {
                const fourStars = rewards.filter((c) => c.rarity === 4)
                pulledReward = fourStars[Math.floor(Math.random() * fourStars.length)]
            } else {
                const threeStars = rewards.filter((c) => c.rarity === 3)
                pulledReward = threeStars[Math.floor(Math.random() * threeStars.length)]
            }
            newPulls.push(pulledReward)
        }
        setPulledRewards(newPulls)

        setTimeout(() => {
            setIsWishing(false)
            setShowResults(true)
        }, 200)
    }

    const closeResults = () => {
        setShowResults(false)
        setPulledRewards([])
    }

    return (
        <div className="grid grid-rows-2 gap-4 w-full h-full">
            <div className="flex items-center justify-center">
                <div className="relative">
                    <Image src={Test}
                    width={800}
                    height={800}
                    alt="picture of genshin banner">
                    </Image>
                    <Button
                      onClick={() => performGacha(3)}
                      disabled={isWishing}
                      className="relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 text-lg font-bold rounded-2xl shadow-lg transform hover:scale-105 transition-all duration-200 border-2 border-blue-400/30 min-w-[180px]"
                    >
                      <div className="text-xs mt-1 opacity-80 drop-shadow-sm">3x pull</div>
                    </Button>

                    {isWishing && (
                        <div>
                            <video muted className="bg-vid">
                                <source src={bgvideo} type="video/mp4"/>
                            </video>
                        </div>
                    )}
                </div>
            </div>
            {showResults && (
                <div className="max-w-[500px]">
                  {pulledRewards.map((character, index) => (
                    <div key={index}>
                        <Card>
                            <CardHeader>
                                <p className={character.color}>{character.name}</p>
                            </CardHeader>
                            <CardDescription>
                                {character.image}
                            </CardDescription>
                        </Card>
                        <br></br>
                    </div>
                  ))}
                <Button 
                    className=""
                    onClick={() => closeResults()}
                >
                    Skibidi toilet
                </Button>   
                </div>
            )}
      </div> 
    )
}