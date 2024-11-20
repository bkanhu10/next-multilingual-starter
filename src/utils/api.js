import axios from "axios";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
// const locale = useLocale();
const locale = Cookies.get("NEXT_LOCALE") || "en";

const getProducts = async () => {
  // console.log("locale: ", locale);
  const res = await axios.get(`${API_URL}/api/v2/tiles`, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": locale,
    },
  });
  return res.data;
};

export { getProducts };
