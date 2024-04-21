import { toast, ToastContent, ToastOptions, TypeOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";

export { ToastContainer } from "react-toastify";

interface TSToastOptions extends ToastOptions {
  type: TypeOptions;
}

export const toastify = (
  content: ToastContent,
  {
    type = "default",
    position = "top-center",
    hideProgressBar = false,
    autoClose = 1000,
    className = "mx-4",
  }: TSToastOptions
) => {
  return toast(content, {
    type,
    position,
    hideProgressBar,
    autoClose,
    className,
  });
};
