"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import ReactMarkdown from 'react-markdown'
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({
  value
}: PreviewProps) => {
  const {resolvedTheme} = useTheme();
    const ReactQuill = useMemo(() => dynamic(() => import("react-quill"), {ssr:false}), [resolvedTheme])
  
  return (
    <ReactQuill
      className={cn(resolvedTheme==="light" ? "text-black" : "text-white")}        
      theme="bubble"
      value={value}
      readOnly
    />
    // <>
    //   <ReactMarkdown>{value}</ReactMarkdown>
    // </>
  )
}