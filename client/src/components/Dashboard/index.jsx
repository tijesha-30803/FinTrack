import { useUser } from "@clerk/clerk-react";
import { FinancialRecordForm } from "./FinancialRecordForm";
import { FinancialRecordList } from "./FinancialRecordList";
import "./FinancialRecord.css";
import { useFinancialRecords } from "../../contexts/financial-record-context";
import { useMemo } from "react";
import hello from "../../assets/robot (1).gif"

export const Dashboard = () => {
    const { user } = useUser();
    const { records } = useFinancialRecords();
    const totalMonthly = useMemo(() => {
    let totalAmount = 0;
    records.forEach((record) => {
      totalAmount += record.amount;
    });

    return totalAmount;
  }, [records]);
  return (
      <div className="overhead">
      <div className="dashboard-container">
        <div className="welcome">
        <div><h1>Welcome {user?.firstName}! Here Are Your Finances:</h1></div>
         <div className="hello"><img src={hello} alt="" className="hello-img" /></div> 
        </div>
            <FinancialRecordForm />
            <div>Total Monthly: Rs.{totalMonthly}</div>
            <FinancialRecordList />
      </div>
      </div>
    );
};