import { Fragment } from "react";
import toast, { Toast, ToastOptions } from "react-hot-toast";
import { HiX } from "react-icons/hi";
import { Transition } from "../Transition";
import { MediaObject, MediaObjectProps } from "../MediaObject";
import { Button } from "../Button";

export type NotificationProps = MediaObjectProps & { t: Toast };

export const renderNotification = (
  notificationProps: Omit<NotificationProps, "t">,
  options?: ToastOptions
) => {
  toast.custom((t) => <Notification t={t} {...notificationProps} />, options);
};

export function Notification({ t, ...mediaObjectProps }: NotificationProps) {
  const notificationClassName =
    "max-w-md w-full bg-light-light dark:bg-dark-light rounded-lg pointer-events-auto flex justify-between items-center z-50 border shadow-xl dark:shadow-none dark:border-dark-accent p-4 space-x-2";

  return (
    <Transition type="scaleUp" show={t.visible || false} appear as={Fragment}>
      <div className={notificationClassName}>
        <MediaObject {...mediaObjectProps} />
        <Button
          size="sm"
          type="link"
          className="text-dark-accent"
          onClick={() => toast.dismiss(t.id)}
        >
          <HiX className="h-5 w-5" />
        </Button>
      </div>
    </Transition>
  );
}
