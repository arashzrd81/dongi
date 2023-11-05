import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const showToast = (message) => {
    toast.error(message, {
        position: "top-center",
        autoClose: 2500,
        closeOnClick: false,
        pauseOnHover: false,
        theme: "colored"
    });
};