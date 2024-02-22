import { Theme, ToastPosition, toast } from "react-toastify";

const toastConfig = {
  position: "top-right" as ToastPosition,
  autoClose: 3000,
  theme: "colored" as Theme,
};

export const showToastSuccess = (message: String) => {
  toast.success(message, toastConfig);
};

export const showToastError = (message: String) => {
  toast.error(message, toastConfig);
};
