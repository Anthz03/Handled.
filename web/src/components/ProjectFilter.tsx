"use client";
import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { portfolioCategories, projects } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";

export function ProjectFilter() {
  const [active, setActive] = useState<string>("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.tags.includes(active as (typeof portfolioCategories)[number]));
  return (
    <LayoutGroup>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {["All", ...portfolioCategories].map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`relative rounded-full px-5 py-2.5 text-sm font-medium transition-colors active:scale-95 ${active === c ? "text-white" : "bg-soft text-navy hover:bg-slate/15"}`}
          >
            {active === c && <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-navy on-dark" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
            <span className="relative">{c}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="mt-12 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {shown.length === 0 && (
        <p className="mt-10 rounded-3xl bg-soft p-12 text-center text-slate">No concept projects in this category yet. More coming soon.</p>
      )}
    </LayoutGroup>
  );
}
