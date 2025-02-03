import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (type, message) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warning(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      toast(message);
  }
};

export default showToast;
