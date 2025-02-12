import { toast } from "react-hot-toast";

const showToast = (type, message) => {
  console.log(message);
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast(message, { icon: "⚠️" });
      break;
    case "info":
      toast(message, { icon: "ℹ️" });
      break;
    default:
      toast(message);
  }
};

export default showToast;
