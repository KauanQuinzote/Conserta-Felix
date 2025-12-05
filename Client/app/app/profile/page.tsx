'use client'
import Card from "@/components/Card";
import LogoutButton from "@/components/LogoutButton";
import AlterarButton from "@/components/ButtonAlterar";
import DeleteButton from "@/components/ButtonDeleteAcount";
import ProfileInfo from "./ProfileInfo";

import { redirect } from "next/navigation";

function handleLogOut() {
    redirect("/sign-in");
}

const handleDeleteAccount = () => {

    const confirmDelete = window.confirm(
        "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
    );

    if (confirmDelete) {
        // TODO: chamar API de delete
        handleLogOut();
    }
};

const handleEditAccount = () => {

};


export default function Profile() {
    return (
        <main className="my-6">
            <Card title="Perfil" width={1200}>
                <ProfileInfo />
                <div className="mt-6 flex flex-wrap gap-3 justify-end">
                    <LogoutButton onClick={handleLogOut} />
                    <AlterarButton onClick={handleEditAccount} />
                    <DeleteButton onClick={handleDeleteAccount} />
                </div>
            </Card>
        </main>
    );
}