import React from "react";
import clsx from "clsx";

interface HeadTextProps {
  children: React.ReactNode;
  as?: "headline" | "subtitle-1" | "subtitle-2" | "subtitle-3";
  className?: string;
}

const HeadText: React.FC<HeadTextProps> = ({
  children,
  as = "headline",
  className,
}) => {
  const headTextClass = clsx(
    {
      "text-[24px] leading-[32px] lg:text-[26px]": as === "headline",
      "text-[14px] leading-[16px] lg:text-[16px]": as === "subtitle-1",
      "text-[12px] leading-[16px] lg:text-[14px]": as === "subtitle-2",
      "text-[10px] leading-[16px] lg:text-[12px]": as === "subtitle-3",
    },
    className,
  );

  return <p className={`font-bold ${headTextClass}`}>{children}</p>;
};

export default HeadText;
