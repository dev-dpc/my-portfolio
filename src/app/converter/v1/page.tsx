import type { Metadata } from "next";
import { ConverterClient } from "./converter-client";

export const metadata: Metadata = {
  title: "Image Converter",
  description: "Convert images between PNG, JPEG, and WebP, entirely in your browser.",
};

export default function ConverterPage() {
  return <ConverterClient />;
}
