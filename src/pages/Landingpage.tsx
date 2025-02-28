import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="h-screen w-full bg-gray-900 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-mono text-white font-extrabold mb-6 text-center">
                WELCOME TO SECOND BRAIN APPLICATION
            </h1>

            <div className="rounded border w-80 flex flex-col justify-center items-center p-6 bg-gray-800 shadow-lg">
                <p className="text-yellow-400 font-serif text-lg text-center mb-4">
                    Add your favourite media on YouTube and Twitter!
                </p>

                <p className="text-white text-md mb-2">Already a user?</p>
                <Button
                    variant="primary"
                    text="Sign In"
                    onClick={() => navigate("/signin")}
                />

                <hr className="w-full border-gray-600 my-4" />

                <p className="text-white text-md mb-2">First time here?</p>
                <Button
                    variant="secondary"
                    text="Sign Up"
                    onClick={() => navigate("/signup")}
                />
            </div>
        </div>
    );
}
