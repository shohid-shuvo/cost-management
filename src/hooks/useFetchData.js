import { useEffect } from "react";
import useExpenseStore from "../store/useExpenseStore";

const useFetchData = () => {
  const fetchExpenses = useExpenseStore((state) => state.fetchExpenses);

  useEffect(() => {
    fetchExpenses();
  }, []);
};

export default useFetchData;
