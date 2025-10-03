"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Copy, Download } from "lucide-react";
import Image from "next/image";

export default function SharePage() {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [copied, setCopied] = useState(false);

  const surveyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/survey/${surveyId}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(surveyUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const canvas = document.getElementById("qr-code") as HTMLCanvasElement;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `survey-${surveyId}-qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const shareLinks = [
    {
      name: "Twitter",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        surveyUrl
      )}&text=${encodeURIComponent("Take this survey!")}`,
      icon: "/social_media/twitter.svg",
    },
    {
      name: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        surveyUrl
      )}`,
      icon: "/social_media/facebook.svg",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        surveyUrl
      )}`,
      icon: "/social_media/linkedin.svg",
    },
    {
      name: "WhatsApp",
      url: `https://api.whatsapp.com/send?text=${encodeURIComponent(
        "Take this survey: " + surveyUrl
      )}`,
      icon: "/social_media/whatsapp.svg",
    },
  ];

  return (
    <div className="p-6 flex-1 flex justify-center">
      <div className="flex-1 max-w-3xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Share your survey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* URL with copy button */}
            <div className="flex gap-2">
              <Input value={surveyUrl} readOnly />
              <Button onClick={handleCopy} variant="secondary">
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-1" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" /> Copy
                  </>
                )}
              </Button>
            </div>
            {/* QR Code */}
            <div className="flex flex-col items-center gap-4">
              <QRCodeCanvas
                id="qr-code"
                value={surveyUrl}
                size={200}
                includeMargin
              />
              <Button onClick={handleDownloadQR}>
                <Download className="h-4 w-4 mr-1" /> Download QR
              </Button>
            </div>
            {/* Social Share */}
            <div className="space-y-3">
              <h3 className="font-medium">Share on social media</h3>
              <div className="flex justify-between flex-wrap gap-3">
                {shareLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="lg" className="py-6">
                      <Image
                        unoptimized
                        alt=""
                        width={32}
                        height={32}
                        src={process.env.NEXT_PUBLIC_APP_URL + link.icon}
                      />
                      <span className="ml-2">{link.name}</span>
                    </Button>
                  </a>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
