import { createContext, useContext, useState , useEffect } from "react";
import PropTypes from 'prop-types';
import { useUser } from "@clerk/clerk-react";

export const FinancialRecordsContext = createContext(undefined);

// FinancialRecordsProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export const FinancialRecordsProvider = ({ children }) => {

  const [records, setRecords] = useState([]);
  const { user } = useUser();

  const fetchRecords = async () => {
    if (!user) return;
    try {
      const response = await fetch(`http://localhost:3001/financial-records/getAllByUserID/${user.id}`
      );

      if (response.ok) {
        const records = await response.json();
        console.log(records);
        setRecords(records);
      }
    }
    catch (err) {
      console.error("Failed to fetch records:", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [user]);

  const addRecord = async (record) => {
    const response = await fetch("http://localhost:3001/financial-records", {
      method: "POST",
      body: JSON.stringify(record),
      headers: {
        "Content-Type": "application/json",
      },
    });
    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) => [...prev, newRecord]);
      }
    }
    catch (err) {
      console.log("Failed to add record:", err);
    }
  };
    
  const updateRecord = async (id, newRecord) => {
    const response = await fetch(
      `http://localhost:3001/financial-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const updatedRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => (record._id === id ? updatedRecord : record))
        );
      }
    } catch (err) {
      console.log("Failed to update Record:", err)
    }
  };
    
  const deleteRecord = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/financial-records/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete record with status ${response.status}`);
    }

    const deletedRecord = await response.json();
    setRecords((prev) => prev.filter((record) => record._id !== deletedRecord._id));
  } catch (err) {
    console.log("Failed to delete record:", err);
  }
};
    
  return (
    <FinancialRecordsContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
      {children}
    </FinancialRecordsContext.Provider>
  );
};

FinancialRecordsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFinancialRecords = () => {
    const context = useContext(FinancialRecordsContext);
    if (!context) {
        throw new Error(
            "useFinancialRecords must be used within a FinancialRecordsProvider"
        );
    }

    return context;
};