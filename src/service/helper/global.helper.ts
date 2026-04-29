import Cookies from "js-cookie";
import { account } from "../../lib/appwrite.conifg";
import { toast } from "sonner";


export const forceLogout = async () => {
  try {
    // Delete current session from Appwrite
    await account.deleteSessions();

    // Remove Cookies
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("user");


    toast.success("Logout Successfully");
    window.location.href="/login"
        // Redirect
  } catch (error) {
    console.error("Logout Error:", error);
  }
};
