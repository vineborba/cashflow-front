import {
  accountTypeBackgroundColor,
  accountTypeToIcon,
} from "../../utils/accountInfo";

type AccountIconProps = {
  type: AccountType;
  size?: number;
  className?: string;
};

export function AccountIcon({ type, size = 24, className }: AccountIconProps) {
  const Icon = accountTypeToIcon[type];
  const bgColor = accountTypeBackgroundColor[type];

  return (
    <Icon
      size={size}
      className={`${bgColor} rounded-full p-1 text-white ${className ? ` ${className}` : ""}`}
    />
  );
}
