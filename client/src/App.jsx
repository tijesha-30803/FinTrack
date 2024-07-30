import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { Auth } from "./components/Auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
//import { SignedIn, UserButton } from "@clerk/clerk-react";
// import { dark } from "@clerk/themes";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <div className="navbar navbar1">
          <SignedIn>
            <Link to="/"></Link>
          </SignedIn>
        </div> */}
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
