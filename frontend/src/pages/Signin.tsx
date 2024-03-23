import Quote from "../components/Quote";
import AuthForm from "../components/AuthForm";

export default function(){
    return(
        <div className="lg:grid grid-cols-2">
            <div>
                <AuthForm type="signin" />
            </div>
            <div className="hidden lg:block">
              <Quote />
            </div>
        </div>
    )
}