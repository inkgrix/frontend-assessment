"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserList() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginTimeStamp = localStorage.getItem("loginTimestamp");
    const now = new Date().getTime();
    const EXP_TIME = 60 * 60 * 1000;

    if (
      !token ||
      !loginTimeStamp ||
      now - parseInt(loginTimeStamp) > EXP_TIME
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("loginTimestamp");
      router.push("/signin");
      return;
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAuth) {
    return null;
  }

  return <div>Hi</div>;
}
