import { FormProvider } from "./context";
import FormSteps from "./FormSteps";

export default function devisAssuranceMoto() {
  return (
    <FormProvider>
      <FormSteps />
    </FormProvider>
  );
}
