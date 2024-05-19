import { useNavigate } from "react-router-dom"
import { Button } from "./Button";

export const Users = ()=>{
    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-4">
            <input type="text" placeholder="Search users.." className="w-full px-2 py-1 border-slate-200"/>
        </div>
        <div>
            Users will be here...
        </div>
    </>
}

function User({user}){
    const navigate = useNavigate();
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button label={"Send Money"}/>
        </div>
    </div>
}