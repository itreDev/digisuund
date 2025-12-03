import cn from "classnames";

interface TextAreaProps {
  name: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export const TextArea = ({
  name,
  id,
  value,
  onChange,
  className,
  ...props
}: TextAreaProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return (
    <textarea
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      className={cn(
        "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  resize-none",
        className
      )}
      {...props}
    />
  );
};
