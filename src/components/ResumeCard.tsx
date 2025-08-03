import { formatMonetaryValue } from "../utils/formatMonetaryValue";

type ResumeCardProps = {
  title: string;
  value: number;
};

export function ResumeCard({ title, value }: ResumeCardProps) {
  return (
    <article className="border rounded-lg border-gray-300 p-4">
      <h6 className="text-sm">{title}</h6>
      <p className="text-2xl font-bold">{formatMonetaryValue(value)}</p>
    </article>
  );
}
