import { useEffect } from "react";
import { CalendarTransparent } from "../../components/date-picker-shadcn-transparent";
import { useFormContext } from "../context";

export default function Step2() {
  const formContext = useFormContext();

  useEffect(() => {
    console.log("Step2 - Current data:", formContext.data);
    console.log(
      "Step2 - dateMiseEnCirculation:",
      formContext.data.dateMiseEnCirculation
    );
  }, [formContext.data]);

  return (
    <CalendarTransparent
      useFormContextHook={
        useFormContext as unknown as () => {
          data: Record<string, unknown>;
          setData: (
            updater:
              | Record<string, unknown>
              | ((prev: Record<string, unknown>) => Record<string, unknown>)
          ) => void;
        }
      }
    />
  );
}
