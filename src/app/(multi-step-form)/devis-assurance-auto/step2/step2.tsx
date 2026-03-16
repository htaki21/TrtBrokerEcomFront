import { CalendarTransparent } from "../../components/date-picker-shadcn-transparent";
import { useFormContext } from "../context";

export default function Step2() {
  const formContext = useFormContext();

  return (
    <CalendarTransparent
      label="Date de mise en circulation"
      isRequired
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
