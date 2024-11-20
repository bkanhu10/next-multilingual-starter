"use client";
import { Link } from "@/i18n/routing";
import { getProducts } from "@/utils/api";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function HomePage() {
  const t = useTranslations("HomePage");

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getProducts();
      console.log(res);
    };
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>{t("title")}</h1>
      <Link href="/hello">{t("about")}</Link>
    </div>
  );
}
