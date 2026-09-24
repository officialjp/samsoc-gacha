'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Button } from "./ui/button";

interface Reward {
    id: number;
    name: string;
    rarity: number;
    color: string;
    image: string;
}

const REWARDS: Reward[] = [
    { id: 1, name: "Sticker", rarity: 3, color: "text-blue-500", image: "/samsoc_bw_stickers.webp" },
    { id: 2, name: "Badge", rarity: 4, color: "text-purple-500", image: "/samsoc_badges.webp" },
    { id: 3, name: "Poster", rarity: 5, color: "text-red-500", image: "/samsoc_posters.webp" },
];

const FALLBACK_REWARD = REWARDS[REWARDS.length - 1]!;

const REWARDS_BY_RARITY = new Map<number, Reward[]>();
for (const reward of REWARDS) {
    const pool = REWARDS_BY_RARITY.get(reward.rarity) ?? [];
    pool.push(reward);
    REWARDS_BY_RARITY.set(reward.rarity, pool);
}

const VIDEO_BY_ID: Record<number, string> = {
    1: "/threestar.mp4",
    2: "/fourstar.mp4",
    3: "/fivestar.mp4",
};

type Phase = "idle" | "wishing" | "results";

const pickReward = (): Reward => {
    if (Math.random() < 0.05) {
        const fiveStars = REWARDS_BY_RARITY.get(5) ?? [];
        return fiveStars[Math.floor(Math.random() * fiveStars.length)] ?? FALLBACK_REWARD;
    }
    if (Math.random() < 0.25) {
        const fourStars = REWARDS_BY_RARITY.get(4) ?? [];
        return fourStars[Math.floor(Math.random() * fourStars.length)] ?? FALLBACK_REWARD;
    }
    const threeStars = REWARDS_BY_RARITY.get(3) ?? [];
    return threeStars[Math.floor(Math.random() * threeStars.length)] ?? FALLBACK_REWARD;
};

export default function GachaSim() {
    const [phase, setPhase] = useState<Phase>("idle");
    const [pulledRewards, setPulledRewards] = useState<Reward[]>([]);
    const [videoId, setVideoId] = useState(1);

    useEffect(() => {
        if (phase !== "wishing") return;
        const timer = setTimeout(() => setPhase("results"), 7300);
        return () => clearTimeout(timer);
    }, [phase]);

    const performGacha = (count: number) => {
        const newPulls = Array.from({ length: count }, pickReward);
        const highest = Math.max(...newPulls.map((reward) => reward.id));

        setVideoId(highest);
        setPulledRewards(newPulls);
        setPhase("wishing");
    };

    const closeResults = () => {
        setPulledRewards([]);
        setPhase("idle");
    };

    if (phase === "idle") {
        return (
            <div className="relative">
                <Image
                    src="/background_image.webp"
                    width={1920}
                    height={1080}
                    priority
                    sizes="100vw"
                    alt="Picture of banner"
                    className="h-auto w-full"
                />
                <Button
                    onClick={() => performGacha(1)}
                    className="absolute right-1 bottom-1 h-12 w-52 rounded-4xl border-2 border-amber-400 bg-amber-50 hover:bg-amber-100"
                >
                    <span className="font-sans text-xs font-bold text-black opacity-80 drop-shadow-sm">
                        Wish x1<br />⭐x1
                    </span>
                </Button>
            </div>
        );
    }

    if (phase === "wishing") {
        return (
            <video key={videoId} autoPlay muted playsInline preload="auto" className="h-auto w-full">
                <source src={VIDEO_BY_ID[videoId]} type="video/mp4" />
            </video>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-row gap-4">
                {pulledRewards.map((reward, index) => (
                    <Card
                        key={`${reward.id}-${index}`}
                        className="from-indigo-200 to-cyan-900 bg-linear-to-b shadow-2xl shadow-cyan-500/50"
                    >
                        <CardHeader>
                            <p className={`${reward.color} text-center text-2xl font-bold drop-shadow-lg`}>
                                {reward.name}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Image src={reward.image} width={200} height={200} alt={reward.name} />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Button className="bg-red-500 hover:bg-red-600" onClick={() => closeResults()}>
                Go Back
            </Button>
        </div>
    );
}
