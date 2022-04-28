import { toast } from "react-toastify";
import Swal from "sweetalert2";

export const setFormData = (data) => {
  let formData = new FormData();
  Object.entries(data).map(([key, value]) => formData.append(key, value));
  return formData;
};

export const notificationOptions = {
  autoClose: 4000,
  closeButton: false,
  hideProgressBar: true,
  position: toast.POSITION.TOP_CENTER,
};

export const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger ml-2",
    cancelButton: "btn btn-light",
  },
  buttonsStyling: false,
});
