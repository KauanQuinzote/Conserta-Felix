'use client';
import Card from "@/components/Card";
import LogoutButton from "@/components/LogoutButton";
import AlterarButton from "@/components/ButtonAlterar";
import DeleteButton from "@/components/ButtonDeleteAcount";
import { redirect } from "next/navigation";

export default function VehiclePage(){

    return <div className="w-full flex justify-center mt-10">
        <Card title="Veículos Cadastrados" width={800}>
           
            <div className="mt-6 flex flex-wrap gap-3 justify-end">
                
            </div>
        </Card>

        

    </div>
}