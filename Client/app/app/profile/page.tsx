'use client'

import Card from "@/components/Card";
import LogoutButton from "@/components/LogoutButton";
import DeleteButton from "@/components/ButtonDeleteAcount";
import ProfileInfo from "./ProfileInfo";
import Loading from "@/components/Loading";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Profile() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/sign-in");
            return;
        }

        setLoading(false);
    }, [router]);

    if (loading) {
        return (
            <main className="p-10 text-center text-gray-600">
                <Loading/>
            </main>
        );
    }


    // Logout
    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/sign-in");
    };

    return (
        <main className="my-6">
            <Card title="Perfil" width={1200}>
                
                {/* Informações do usuário */}
                <ProfileInfo />

                <div className="mt-6 flex flex-wrap gap-3 justify-end">
                    <LogoutButton onClick={handleLogOut} />
                </div>

            </Card>
        </main>
    );
}
