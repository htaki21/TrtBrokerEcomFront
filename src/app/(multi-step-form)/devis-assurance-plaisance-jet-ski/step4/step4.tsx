import { useCallback } from "react";
import SingleFileUploader from "../../components/SingleFileUploader";
import { useFormContext } from "../context";

export default function Step4() {
  const { setData } = useFormContext();

  const handleFileChange = useCallback(
    (file: unknown) => {
      if (
        file &&
        typeof file === "object" &&
        "name" in file &&
        file instanceof File
      ) {
        // Store the actual File object in the form data
        setData((prev) => ({
          ...prev,
          ficheTechniqueOptionnelle: file,
        }));
      } else {
        // Clear the file if removed
        setData((prev) => ({
          ...prev,
          ficheTechniqueOptionnelle: undefined,
        }));
      }
    },
    [setData]
  );

  return (
    <div className="f-col gap-4 max-tablet:gap-3">
      <SingleFileUploader onChange={handleFileChange} />
    </div>
  );
}
