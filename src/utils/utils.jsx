import { ToastContainer, toast } from "react-toastify";

export const handleDate = (date) => {
  return date.length > 100 ? date.subString(0, 100) + "..." : date;
};
export const notifySuccess = (str) => {
  toast.success("🦄" + str.toUpperCase());
};
export const notifyError = (str) => {
  toast.error("🦄" + str.toUpperCase());
};
export const checkDuplicateAndReturnIndex = (payload, arr) => {
  for (const i in arr) {
    if (
      arr[i].id === payload.id &&
      arr[i].color === payload.color &&
      arr[i].size === payload.size
    ) {
      return i;
    }
  }
  return null;
};
