import { FormProvider } from "./context";
import FormSteps from "./FormSteps";

export default function devisAssuranceSante() {
  return (
    <FormProvider>
      <FormSteps />
    </FormProvider>
  );
}
