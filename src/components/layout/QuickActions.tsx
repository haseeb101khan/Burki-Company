"use client";

import Link from "next/link";
import { useState } from "react";
import { WheelLoaderIcon } from "@/components/ui/EquipmentIcons";
import {
  ChevronRightIcon,
  PartsIcon,
  QuoteIcon,
  WhatsAppIcon,
} from "@/components/ui/Icons";
import { cn, toWhatsAppNumber } from "@/lib/utils";

const actionClass =
  "group flex min-h-[4.75rem] flex-col items-center justify-center gap-1.5 px-2 text-center " +
  "text-sm font-medium leading-tight transition-colors focus-visible:relative focus-visible:z-10";

export function QuickActions({ whatsapp }: { whatsapp: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const whatsappHref = `https://wa.me/${toWhatsAppNumber(whatsapp)}`;

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => setCollapsed(false)}
        aria-label="Open quick actions"
        title="Open quick actions"
        className="fixed right-0 top-1/2 z-40 flex h-12 w-10 -translate-y-1/2 items-center justify-center rounded-l-[3px] border border-r-0 border-navy-600 bg-navy-800 text-white shadow-[0_10px_28px_rgba(0,17,46,0.28)] transition-colors hover:bg-navy-700"
      >
        <ChevronRightIcon className="rotate-180 text-xl" />
      </button>
    );
  }

  return (
    <aside
      aria-label="Quick actions"
      className="fixed right-0 top-1/2 z-40 w-[5.5rem] -translate-y-1/2 sm:w-24"
    >
      <nav className="overflow-hidden rounded-l-[3px] border border-r-0 border-steel-200 bg-white shadow-[0_14px_34px_rgba(0,17,46,0.2)]">
        <Link
          href="/request-a-quote"
          className={cn(actionClass, "bg-navy-700 text-white hover:bg-navy-600")}
        >
          <QuoteIcon className="text-[1.65rem]" />
          <span>Order Online</span>
        </Link>
        <Link
          href="/equipment"
          className={cn(actionClass, "border-b border-steel-200 text-navy-900 hover:bg-steel-50")}
        >
          <WheelLoaderIcon className="text-[2.25rem] text-navy-700" />
          <span>Products</span>
        </Link>
        <Link
          href="/parts"
          className={cn(actionClass, "border-b border-steel-200 text-navy-900 hover:bg-steel-50")}
        >
          <PartsIcon className="text-[1.65rem] text-navy-700" />
          <span>Parts</span>
        </Link>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(actionClass, "border-b border-steel-200 text-navy-900 hover:bg-steel-50")}
        >
          <WhatsAppIcon className="text-[1.65rem] text-navy-700" />
          <span>Contact Us</span>
        </a>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          aria-label="Close quick actions"
          title="Close quick actions"
          className="flex h-11 w-full items-center justify-center text-navy-800 transition-colors hover:bg-steel-50 hover:text-navy-600"
        >
          <ChevronRightIcon className="text-xl" />
        </button>
      </nav>
    </aside>
  );
}
