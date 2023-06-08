import "simplebar-react/dist/simplebar.min.css";

import DocumentationTabs from "@/components/DocumentationTabs";
import { FC } from "react";
import LargeHeading from "@/components/ui/LargeHeading";
import type { Metadata } from "next";
import Paragraph from "@/components/ui/Paragraph";

export const metadata: Metadata = {
  title: "Similarity API | Documentation",
  description: "Free & open-source text similarity API",
};

const Documentation: FC = () => {
  return (
    <div className="container max-w-7xl mx-auto mt-12">
      <div className="flex flex-col items-center gap-6">
        <LargeHeading>Making a request</LargeHeading>
        <Paragraph>api/v1/similarity</Paragraph>

        <DocumentationTabs />
      </div>
    </div>
  );
};

export default Documentation;
