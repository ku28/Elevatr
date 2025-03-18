import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";

const SummaryPreview = () => {
  const { formData } = useFormContext();

  return (
    <div className="mx-8">
      <h2
        className="text-left font-bold text-sm mb-2"
        style={{
          color: formData?.themeColor || themeColors[0],
        }}
      >
        Summary
      </h2>
      <hr
        style={{
          borderColor: formData?.themeColor || themeColors[0],
        }}
      />
      <p className="text-xs my-2 text-justify">{formData?.summary}</p>
    </div>
  );
};

export default SummaryPreview;
