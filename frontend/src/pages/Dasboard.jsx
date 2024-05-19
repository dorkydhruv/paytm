import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/User";

export const Dashboard = () => {
    return (
        <div className="border-fuchsia-100 h-full">
            <Appbar/>
            <div className="m-8">
                <Balance value={1000}/>
                <Users/>
            </div>
        </div>
    );
}