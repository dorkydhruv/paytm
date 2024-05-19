import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Header } from "../components/Header"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

export const SignUp = ()=>{
    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Header label={"Sign Up"}/>
                    <SubHeading label={"Enter your information to create an account"}/>
                    <InputBox label={"First Name"} placeholder={"John"} onChange={(e)=>console.log(e.target.value)}/>
                    <InputBox onChange={(e) => {
                            console.log(e.target.value);
                         }} placeholder="Doe" label={"Last Name"} />
                    <InputBox onChange={e => {
                            console.log(e.target.value);
                        }} placeholder="dhruv@gmail.com" label={"Email"} />
                    <InputBox onChange={(e) => {
                    console.log(e.target.value)
                    }} placeholder="123456" label={"Password"} />
                    <div className="pt-4">
                        <Button onClick={()=>{
                            console.log("Sign Up button clicked")
                        }} label={"Sign Up"}/>
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"}/>
                </div>
            </div>
        </div>
    )
}