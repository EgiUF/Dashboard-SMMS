import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  colorClassName?: string;
  iconColorClassName?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  colorClassName = "text-sanggaluri",
  iconColorClassName = "bg-sanggaluri/10 text-sanggaluri"
}: StatCardProps) {
  return (
    <div className="bg-card p-6 rounded-3xl border border-border-custom shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-2xl", iconColorClassName)}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
            trend.isPositive ? "text-growth bg-growth/10" : "text-likes bg-likes/10"
          )}>
            {trend.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            <span>{trend.value}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className={cn("text-2xl font-bold tracking-tight", colorClassName)}>
          {value}
        </p>
      </div>
    </div>
  );
}
