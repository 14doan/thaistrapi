import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, [router]);

  return (
    <div className="notFound">
      <h2>Computer says no</h2>
      <p>Blame the computer</p>
      <p>
        Going back to <Link href="/">Home</Link> in 5 seconds...
      </p>
    </div>
  );
};

export default NotFound;
