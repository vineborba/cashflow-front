import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export function TagsList({
  tags,
  className = "text-left",
}: {
  tags: string[];
  className?: string;
}) {
  if (!tags.length) {
    return (
      <p
        className={`${className} text-xs font-semibold md:text-sm lg:text-base`}
      >
        Sem categoria
      </p>
    );
  }

  if (tags.length === 1) {
    return (
      <p
        className={`${className} text-xs font-semibold md:text-sm lg:text-base`}
      >
        {tags[0]}
      </p>
    );
  }

  return (
    <Popover className="flex flex-wrap gap-1">
      <PopoverButton className="cursor-pointer">
        <p
          key={tags[0]}
          className={`${className} text-xs font-semibold md:text-sm lg:text-base`}
        >
          {tags[0]} +{tags.length - 1}
        </p>
        <PopoverPanel
          anchor="bottom"
          className="ring-opacity-5 flex flex-col rounded-lg bg-white p-2 shadow-lg ring-1 ring-slate-400"
        >
          {tags.map((t) => (
            <span
              key={t}
              className="border-t border-gray-300 pt-1 text-xs font-semibold first:border-t-0 lg:text-base"
            >
              {t}
            </span>
          ))}
        </PopoverPanel>
      </PopoverButton>
    </Popover>
  );
}
