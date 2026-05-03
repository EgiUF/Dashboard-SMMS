"use client";

import React from "react";
import { LogOut, X } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  icon?: React.ReactNode;
  title: string;
  description: string;
  subDescription?: string;
  cancelText?: string;
  confirmText?: string;
  confirmColor?: string;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  icon,
  title,
  description,
  subDescription,
  cancelText = "Batal",
  confirmText = "Ya, Keluar",
  confirmColor = "bg-[#ef4444] hover:bg-[#dc2626]"
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm p-8 text-center animate-in zoom-in-95 fade-in duration-200">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
        
        <div className="w-16 h-16 bg-[#fee2e2] rounded-full flex items-center justify-center mx-auto mb-5">
          {icon || <LogOut className="w-7 h-7 text-[#ef4444]" />}
        </div>
        
        <h3 className="text-xl font-bold text-[#1e293b] mb-2">{title}</h3>
        <p className="text-sm font-semibold text-gray-600 mb-1">{description}</p>
        {subDescription && <p className="text-xs text-gray-400 mb-6">{subDescription}</p>}
        
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-gray-200 text-[#1e293b] rounded-xl text-sm font-bold hover:bg-gray-50 transition-all"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-6 py-2.5 ${confirmColor} text-white rounded-xl text-sm font-bold transition-all`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
