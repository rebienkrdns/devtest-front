"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
    currentId: number;
}

export default function UserNavigation({ currentId }: Props) {
    const router = useRouter();
    const [showToast, setShowToast] = useState(false);

    function handlePrev() {
        if (currentId <= 1) {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } else {
            router.push(`/users/${currentId - 1}`);
        }
    }

    function handleNext() {
        router.push(`/users/${currentId + 1}`);
    }

    return (
        <div className="flex justify-center items-center gap-6 mt-8 relative">
            <button
                onClick={handlePrev}
                className="px-6 py-2 rounded text-xl font-bold transition-colors"
            >
                −
            </button>

            <span className="text-lg font-semibold">ID: {currentId}</span>

            <button
                onClick={handleNext}
                className="px-6 py-2 rounded text-xl font-bold transition-colors"
            >
                +
            </button>

            {showToast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-lg shadow-lg text-sm animate-pulse">
                    ⚠️ Estás en el primer ID
                </div>
            )}
        </div>
    );
}
