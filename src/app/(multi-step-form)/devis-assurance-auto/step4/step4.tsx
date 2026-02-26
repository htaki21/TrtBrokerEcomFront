import { useFormContext } from "../context";
import { Slider } from "@heroui/slider";

export default function Step4() {
  const { data, setData } = useFormContext();

  // Generate marks for every value from 4 to 15
  const marks = Array.from({ length: 12 }, (_, index) => ({
    value: 4 + index,
    label: (4 + index).toString(),
  }));

  const handleSliderChange = (value: number | number[]) => {
    const chevauxValue = Array.isArray(value) ? value[0] : value;
    setData((prev) => ({ ...prev, chevaux: chevauxValue }));
  };

  return (
    <div className="my-14 max-mobile:my-8">
      <Slider
        className="w-full"
        color="primary"
        defaultValue={data.chevaux || 9}
        value={data.chevaux || 9}
        onChange={handleSliderChange}
        label="Nombre de chevaux"
        maxValue={15}
        minValue={4}
        step={1}
        size="lg"
        showSteps={true}
        showTooltip={true}
        marks={marks}
      />
    </div>
  );
}
