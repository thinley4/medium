import Quote from "../components/Quote";
import AuthForm from "../components/AuthForm";

export default function(){
    return(
        <div className="grid grid-cols-2">
            <div>
                <AuthForm />
            </div>
            <div className="invisible md:visible">
              <Quote />
            </div>
        </div>
    )
}