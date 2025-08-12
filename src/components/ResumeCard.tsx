import { formatMonetaryValue } from "../utils/formatMonetaryValue";

type ResumeCardProps = {
  title: string;
  value: number;
  className?: string;
};

export function ResumeCard({ title, value, className }: ResumeCardProps) {
  return (
    <article
      className={`rounded-lg border border-gray-300 p-4${className ? ` ${className}` : ""}`}
    >
      <h6 className="text-sm">{title}</h6>
      <p className="text-lg font-bold md:text-2xl">
        {formatMonetaryValue(value)}
      </p>
    </article>
  );
}
