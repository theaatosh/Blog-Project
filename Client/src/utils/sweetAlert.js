import Swal from "sweetalert2";

const showAlert = (title, text, icon = "success") => {
  return Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#007bff",
    confirmButtonText: "OK",
    background: "#ffffff",
    customClass: {
      popup: "sweet-alert-popup",
      title: "sweet-alert-title",
      content: "sweet-alert-content",
      confirmButton: "sweet-alert-button",
    },
  });
};

export default showAlert;