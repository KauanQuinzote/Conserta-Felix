'use-client'
import Card from "./Card"
import Form from "./Form"
import LogoutButton from "./ButtonLogout"
import { redirect } from "next/navigation"

function LogOut(){
    redirect("/app/home")
}

export default function ProfileHeader(){
    return <div>
        <Card title="Pedidos" width={300} height={500}>
            <Form>
                
                <LogoutButton onClick={LogOut}/>
            </Form>
        </Card>
    </div>
}