// src/components/CardPreview.tsx
"use client";

import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import Image from "next/image";

interface CardPreviewProps {
  name: string;
  title: string;
  qrData: string;
  image: string;
}

export default function CardPreview({
  name,
  title,
  qrData,
  image,
}: CardPreviewProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center">
        {image && (
          <Image
            src={image}
            alt={`${name}'s profile`}
            width={80}
            height={80}
            className="rounded-full object-cover mb-2"
            unoptimized // Optional: Use remotePatterns in next.config.js for better LCP
          />
        )}
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-muted-foreground">{title}</p>
        <div className="mt-4">
          <QRCodeCanvas value={qrData} size={100} />
        </div>
      </div>
    </div>
  );
}
