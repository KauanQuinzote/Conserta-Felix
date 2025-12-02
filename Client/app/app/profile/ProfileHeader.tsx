'use client';
import Card from "@/components/Card";
import ProfileInfo from "./ProfileInfo";
import LogoutButton from "@/components/LogoutButton";
import AlterarButton from "@/components/ButtonAlterar";
import DeleteButton from "@/components/ButtonDeleteAcount";
import { redirect } from "next/navigation";

function handleLogOut(){
    redirect("/app/home")
}

const handleDeleteAccount = () => {
    // Depois necessário implementar a chamada para a API de exclusão
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita."
    );

    if (confirmDelete) {
      // TODO: chamar API de delete
      handleLogOut();
    }
  };

   const handleEditAccount = () => {
    // Ajuste a rota para salvar edições
  };


export default function ProfileHeader(){

    return <div className="w-full flex justify-center mt-10">
        <Card title="Perfil" width={800}>
            <ProfileInfo/>
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
                <LogoutButton onClick={handleLogOut}/> 
                <AlterarButton onClick={handleEditAccount}/>
                <DeleteButton onClick={handleDeleteAccount}/>
            </div>
        </Card>

        

    </div>
}