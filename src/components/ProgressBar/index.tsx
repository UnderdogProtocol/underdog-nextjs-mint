interface ProgressBarProps {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="flex w-full flex-col items-center overflow-hidden rounded-full">
      <div className="h-3 w-full bg-light-accent dark:bg-dark-accent">
        <div
          style={{ width: `${percentage}%` }}
          className="bg-dark dark:bg-light h-full"
        />
      </div>
    </div>
  );
}

export default ProgressBar;
