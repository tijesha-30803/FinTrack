import { SignedIn, SignedOut, SignInButton, SignUpButton , UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import hero_image from "../../assets/re.gif";
import "./Auth.css"


export const Auth = () => {
    return (
        <div>
            <SignedOut>
                <div className="hero_section">
                <div className="left">
                        <h1 className="auth_welcome">Welcome to Your Personal Finance Tracker!</h1>
                        <h3 className="subhero">Track every penny effortlessly</h3>
                        <div className="line"></div>
                <SignUpButton mode="modal" className="signup"/>
                <SignInButton mode="modal" className="signin"/>
                </div>
                <div className="right"><img src={hero_image} alt="" className="hero_image" /></div>
            </div>
            </SignedOut>
            <SignedIn>
                <div className="hero_section">
                    <div className="left">
                        <h1 className="auth_welcome">Welcome to Your Personal Finance Tracker!</h1>
                        <h3 className="subhero">Track every penny effortlessly</h3>
                        <div className="line"></div>
                        <div className="dash_profile">
                        <Link to="/dashboard"><button className="dashboard">Dashboard</button></Link>
                        <div className="profile"><UserButton className="enlarged-user-button" /></div>
                        </div>
                    </div>
                    <div className="right"><img src={hero_image} alt="" className="hero_image" /></div>
                </div>
            </SignedIn>
    </div>
    );
};