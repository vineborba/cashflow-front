import {
  accountTypeBackgroundColor,
  accountTypeToIcon,
} from "../../utils/accountInfo";

type AccountIconProps = {
  type: AccountType;
  className?: string;
};

export function AccountIcon({ type, className }: AccountIconProps) {
  const Icon = accountTypeToIcon[type];
  const bgColor = accountTypeBackgroundColor[type];

  return (
    <div className={`p-1 ${bgColor} rounded-full`}>
      <Icon
        className={`h-4 w-4 text-white md:h-6 md:w-6 ${className ? ` ${className}` : ""}`}
      />
    </div>
  );
}
