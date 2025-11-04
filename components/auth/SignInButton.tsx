"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

interface SignInButtonProps {
  callbackUrl?: string;
  className?: string;
  children?: React.ReactNode;
}

export function SignInButton({
  callbackUrl = "/dashboard",
  className = "",
  children,
}: SignInButtonProps) {
  const router = useRouter();

  const handleSignIn = () => {
    router.push(`/auth/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`);
  };

  return (
    <button
      onClick={handleSignIn}
      className={
        className ||
        "rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
      }
    >
      {children || "Entrar"}
    </button>
  );
}

export function SignInButtonInline({
  provider = "google",
  callbackUrl = "/dashboard",
  className = "",
  children,
}: SignInButtonProps & { provider?: string }) {
  const handleSignIn = () => {
    signIn(provider, { callbackUrl });
  };

  return (
    <button
      onClick={handleSignIn}
      className={
        className ||
        "rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      }
    >
      {children || "Entrar"}
    </button>
  );
}
