import Card from "../../components/cards/card";
import { BirthdayCalendar } from "../../components/date-picker-birthday";
import { MesenfantsIcon } from "../../components/icons/Mesenfants";
import { MoiIcon } from "../../components/icons/Moi";
import { MonconjointIcon } from "../../components/icons/Monconjoint";
import { useFormContext as useForm4Context } from "../context";

export default function Step2() {
  const { data, setData, fieldErrors, setFieldError, clearFieldError } =
    useForm4Context();

  // Validate birthday date - must be in the past
  const validateBirthday = (dateString: string) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateChange = (field: string, date: Date | undefined) => {
    const dateString = date ? date.toISOString() : "";

    // Clear any existing error for this field
    clearFieldError(field);

    // Validate if date is provided
    if (dateString && !validateBirthday(dateString)) {
      setFieldError(
        field,
        "La date de naissance doit être antérieure à la date actuelle"
      );
    }

    setData((prev) => ({
      ...prev,
      [field]: dateString,
    }));
  };

  const handleSelect = (type: "Moi" | "Mon conjoint" | "Mes enfants") => {
    setData((prev) => {
      const current = prev.beneficiairesACouvrir || [];
      if (current.includes(type)) {
        // Remove if already selected
        return {
          ...prev,
          beneficiairesACouvrir: current.filter((b) => b !== type),
        };
      } else {
        // Add if not selected
        return { ...prev, beneficiairesACouvrir: [...current, type] };
      }
    });
  };

  return (
    <>
      <div className="flex gap-4 max-tablet:flex-col max-tablet:gap-2">
        <Card
          padding="py-[48px] px-[20px]"
          svg={<MoiIcon className="w-[56px] h-[56px]" />}
          title="Moi"
          description="Vous-même"
          selected={data.beneficiairesACouvrir.includes("Moi")}
          onClick={() => handleSelect("Moi")}
        />

        <Card
          padding="py-[48px] px-[20px]"
          svg={<MonconjointIcon className="w-[56px] h-[56px]" />}
          title="Mon conjoint"
          description="Marié(e) ou pacsé(e)"
          selected={data.beneficiairesACouvrir.includes("Mon conjoint")}
          onClick={() => handleSelect("Mon conjoint")}
        />

        <Card
          padding="py-[48px] px-[20px]"
          svg={<MesenfantsIcon className="w-[56px] h-[56px]" />}
          title="Mes enfants"
          description="Enfants à charge ou scolarisés"
          selected={data.beneficiairesACouvrir.includes("Mes enfants")}
          onClick={() => handleSelect("Mes enfants")}
        />
      </div>

      {data.beneficiairesACouvrir.length > 0 && (
        <div className="f-col gap-8 mt-6">
          <div className="flex flex-col gap-2 text-balance">
            <h2 className="text-Neutral-Dark text-[32px]/[40px] tracking-[-1px] max-tablet:tracking-[-0.5px] max-tablet:text-[22px]/[28px] font-medium">
              Date(s) de naissance
            </h2>
            <p className="text-Text-Body text-[16px]/[24px] max-tablet:text-[14px]/[20px] font-normal">
              Indiquez la date de naissance des bénéficiaires pour personnaliser
              votre couverture santé.
            </p>
          </div>

          {data.beneficiairesACouvrir.includes("Moi") && (
            <div className="flex max-tablet:flex-col items-center gap-1.5">
              <h6 className="text-Neutral-Dark text-[14px]/[20px] w-full">
                Ma date de naissance
              </h6>
              <BirthdayCalendar
                placeholder="JJ / MM / AAAA"
                label=""
                value={
                  data.selectedDateMoi
                    ? new Date(data.selectedDateMoi)
                    : undefined
                }
                onChange={(date) => handleDateChange("selectedDateMoi", date)}
                error={fieldErrors.selectedDateMoi}
              />
            </div>
          )}

          {data.beneficiairesACouvrir.includes("Mon conjoint") && (
            <div className="flex max-tablet:flex-col items-center gap-1.5">
              <h6 className="text-Neutral-Dark text-[14px]/[20px] w-full">
                Date de naissance du conjoint
              </h6>
              <BirthdayCalendar
                placeholder="JJ / MM / AAAA"
                label=""
                value={
                  data.selectedDateConjoint
                    ? new Date(data.selectedDateConjoint)
                    : undefined
                }
                onChange={(date) =>
                  handleDateChange("selectedDateConjoint", date)
                }
                error={fieldErrors.selectedDateConjoint}
              />
            </div>
          )}

          {data.beneficiairesACouvrir.includes("Mes enfants") && (
            <div className="f-col gap-2">
              {["enfant 1", "enfant 2", "enfant 3"].map((label, idx) => (
                <div
                  key={idx}
                  className="flex max-tablet:flex-col items-center gap-1.5"
                >
                  <h6 className="text-Neutral-Dark text-[14px]/[20px] w-full">
                    Date de naissance {label}
                  </h6>
                  <BirthdayCalendar
                    placeholder="JJ / MM / AAAA"
                    label=""
                    value={
                      data[`selectedDateEnfant${idx + 1}` as keyof typeof data]
                        ? new Date(
                            data[
                              `selectedDateEnfant${idx + 1}` as keyof typeof data
                            ] as string
                          )
                        : undefined
                    }
                    onChange={(date) =>
                      handleDateChange(`selectedDateEnfant${idx + 1}`, date)
                    }
                    error={fieldErrors[`selectedDateEnfant${idx + 1}`]}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
