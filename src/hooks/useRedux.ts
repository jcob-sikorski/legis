import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useRedux = (fieldName: string) => {
  const [data, setData] = useState<any>({});
  // const [error, setError] = useState<any>(null);
  // const [loading, setLoading] = useState<boolean>(false);

  const selectedData = useSelector((store: any) => store[fieldName]);

  useEffect(() => {
    setData(selectedData);
  }, [selectedData]);

  return [data];
};
