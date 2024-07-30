import { useState } from "react"
import { useUser } from '@clerk/clerk-react'
import { useFinancialRecords } from "../../contexts/financial-record-context";


export const FinancialRecordForm = () => {

    const [description, setDescription] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")
    const { addRecord } = useFinancialRecords();
    
    const { user } = useUser();

    const handleSubmit = (event) => { 
        event.preventDefault();  //so that page is not refreshed when we submit the form
        const newRecord = {
            userId: user?.id??"",
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod,
        };

        addRecord(newRecord); // to call the server or database and send the data
        setDescription("");  //set the fields back to empty
        setAmount("");
        setCategory("");
        setPaymentMethod("");
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
            <div className="form-field">
                <label>Descirption:</label>
                <input
                    type="text"
                    required
                    className="input"
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                />   
            </div>    
            <div className="form-field">
                <label>Amount (Enter expenses with a negative sign and income with a positive sign):</label>
                <input
                    type="number"
                    required
                    className="input"
                    value={amount}
                    onChange={(e)=> setAmount(e.target.value)}
                />
            </div>
            <div className="form-field">
                <label>Category:</label>
                    <select
                        required
                        className="input"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select a Category</option>
                    <option value="Food">Food</option>
                    <option value="Rent">Rent</option>
                    <option value="Salary">Salary</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                </select>  
            </div>
            <div className="form-field">
                <label>Payment Method:</label>
                <select required className="input" value={paymentMethod} onChange={(e)=> setPaymentMethod(e.target.value)}>
                    <option value="">Select a Payment Method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="UPI">UPI</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                </select>
            </div>
            <button type="submit" className="button">
                Add Record
            </button>
         </form>
        </div>
    );
}