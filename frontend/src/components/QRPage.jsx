import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";

const QRPage = () => {
  const [link, setLink] = useState("");
  const [qrLink, setQrLink] = useState("");
  const qrRef = useRef();

  const handleGenerateQR = (e) => {
    e.preventDefault();
    setQrLink(link);
  };

  const handleDownloadQR = () => {
    const svg = qrRef.current.querySelector("svg");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngFile;
      downloadLink.download = "qr-code.png";
      downloadLink.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="h-screen bg-hero-pattern flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-white">Generate QR Code</h1>
      <form
        onSubmit={handleGenerateQR}
        className="flex flex-col items-center gap-4 w-[80%] sm:w-[50%]"
      >
        <Input
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter a link to generate QR code"
          className="w-full border border-gray-300 p-2 rounded-md bg-white"
        />
        <Button
          type="submit"
          className="bg-[#8C50D7] text-white font-bold px-4 py-2 rounded-md"
        >
          Generate QR Code
        </Button>
      </form>
      {qrLink && (
        <div className="mt-4 flex flex-col items-center gap-2">
          <div
            ref={qrRef}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <QRCode value={qrLink} />
          </div>
          <p className="text-gray-600 text-sm">Scan the QR code or share it!</p>
          <Button
            onClick={handleDownloadQR}
            className="bg-[#8C50D7] text-white font-bold px-4 py-2 rounded-md"
          >
            Download QR Code
          </Button>
        </div>
      )}
    </div>
  );
};

export default QRPage;
