import { useFormContext } from "@/lib/context/FormProvider";
import { themeColors } from "@/lib/utils";
import React from "react";

const SkillsPreview = () => {
  const { formData } = useFormContext();

  return (
    <div className="my-6 mx-8">
      <h2
      className="text-left font-bold text-sm mb-2"
      style={{
        color: formData?.themeColor || themeColors[0],
      }}
      >
      Skill{formData?.skills.length > 1 ? "s" : ""}
      </h2>
      <hr
      style={{
        borderColor: formData?.themeColor || themeColors[0],
      }}
      />

      <div className="my-5">
      <h2 className="text-xs">
        {formData?.skills.map((skill: any) => skill.name).join(", ")}
      </h2>
      </div>
    </div>
  );
};

export default SkillsPreview;
