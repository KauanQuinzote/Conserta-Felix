'use client';
import Card from "@/components/Card";
import ProfileInfo from "./ProfileInfo";
import LogoutButton from "@/components/LogoutButton";
import { redirect } from "next/navigation";

function LogOut(){
    redirect("/app/home")
}

export default function ProfileHeader(){

    return <div className="w-full flex justify-center mt-10">
        <Card title="Perfil" width={800}>
            <ProfileInfo/>
            <LogoutButton onClick={LogOut}/>
        </Card>

        

    </div>
}