import { Compass, Cpu, Database, FileText, Globe, PenTool } from "lucide-react";
import type { Service } from "@/lib/data";

const map = { globe: Globe, cpu: Cpu, database: Database, pen: PenTool, compass: Compass, file: FileText };

export function ServiceIcon({ icon, className = "h-5 w-5" }: { icon: Service["icon"]; className?: string }) {
  const Icon = map[icon];
  return <Icon className={className} aria-hidden="true" />;
}
