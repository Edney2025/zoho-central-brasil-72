
import * as React from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast as useToastOriginal } from "@/components/ui/toast"

export type ToastType = React.ComponentPropsWithoutRef<typeof Toast>

export type ToastActionElement = React.ReactElement<typeof ToastAction>

export const Toaster = () => {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

export const useToast = useToastOriginal;

export interface ToastActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  altText?: string;
  children?: React.ReactNode;
}

export const ToastAction = React.forwardRef<HTMLButtonElement, ToastActionProps>(
  ({ className, altText, ...props }, ref) => (
    <button
      ref={ref}
      className="inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive"
      {...props}
    />
  )
)
ToastAction.displayName = "ToastAction";

export type {
  ToastProps,
  ToastActionProps as ToastActionElement,
} from "@radix-ui/react-toast";

export const toast = useToastOriginal().toast;
