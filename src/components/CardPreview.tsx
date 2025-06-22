// src/components/CardPreview.tsx
import React from "react";
import { QRCodeCanvas } from "qrcode.react";

interface CardPreviewProps {
  id: string;
  name: string;
  title: string;
  qrData: string;
  image: string;
  template: string;
}

export default function CardPreview({
  id,
  name,
  title,
  qrData,
  image,
  template,
}: CardPreviewProps) {
  return (
    <div className={`border rounded-lg p-4 shadow-md bg-white dark:bg-gray-900`}>
      <div className="flex flex-col items-center">
        {image && (
          <img
            src={image}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover mb-2"
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
