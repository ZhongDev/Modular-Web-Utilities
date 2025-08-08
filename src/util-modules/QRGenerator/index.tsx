import React, { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import type { QRCodeRenderersOptions, QRCodeToStringOptions } from "qrcode";

type QRType = "text" | "url" | "wifi" | "email" | "sms";

const defaultOptions: QRCodeRenderersOptions = {
  margin: 2,
  scale: 8,
  color: {
    dark: "#000000ff",
    light: "#ffffffff",
  },
};

const QRGenerator: React.FC = () => {
  const [qrType, setQrType] = useState<QRType>("text");
  const [text, setText] = useState("");
  const [ssid, setSsid] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiAuth, setWifiAuth] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [smsNumber, setSmsNumber] = useState("");
  const [smsBody, setSmsBody] = useState("");
  const [centerImage, setCenterImage] = useState<string>("");
  const [errorCorrection, setErrorCorrection] = useState<"L" | "M" | "Q" | "H">(
    "M"
  );
  const [foreground, setForeground] = useState("#000000");
  const [background, setBackground] = useState("#ffffff");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const dataString = useMemo(() => {
    if (qrType === "text") return text.trim() ? text : "Hello, World";
    if (qrType === "url") {
      const u = text.trim();
      if (!u) return "http://example.com";
      // If no URI scheme is present, default to http://
      return /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(u) ? u : `http://${u}`;
    }
    if (qrType === "wifi") {
      const auth = wifiAuth === "nopass" ? "nopass" : wifiAuth;
      const pwd = wifiAuth === "nopass" ? "" : wifiPassword;
      // WIFI:T:WPA;S:mynetwork;P:mypass;;
      return `WIFI:T:${auth};S:${escapeSemicolons(ssid)};P:${escapeSemicolons(
        pwd
      )};H:${wifiHidden ? "true" : "false"};`;
    }
    if (qrType === "email") {
      const subject = encodeURIComponent(emailSubject);
      const body = encodeURIComponent(emailBody);
      return `mailto:${encodeURIComponent(
        emailTo
      )}?subject=${subject}&body=${body}`;
    }
    if (qrType === "sms") {
      const body = encodeURIComponent(smsBody);
      return `sms:${encodeURIComponent(smsNumber)}?body=${body}`;
    }
    return text;
  }, [
    qrType,
    text,
    ssid,
    wifiPassword,
    wifiAuth,
    wifiHidden,
    emailTo,
    emailSubject,
    emailBody,
    smsNumber,
    smsBody,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const options: QRCodeRenderersOptions = {
      ...defaultOptions,
      errorCorrectionLevel: errorCorrection,
      color: {
        dark: `${foreground}ff`,
        light: `${background}ff`,
      },
    };

    QRCode.toCanvas(canvas, dataString, options, (err) => {
      if (err) {
        console.error("Failed to render QR to canvas", err);
        return;
      }
      if (centerImage) {
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const size = Math.min(canvas.width, canvas.height);
          const overlaySize = Math.floor(size * 0.22);
          const x = (canvas.width - overlaySize) / 2;
          const y = (canvas.height - overlaySize) / 2;

          // Draw white rounded rectangle as background for better readability
          const radius = Math.max(8, Math.floor(overlaySize * 0.12));
          roundRect(ctx, x, y, overlaySize, overlaySize, radius, background);

          ctx.drawImage(img, x, y, overlaySize, overlaySize);
        };
        img.src = centerImage;
      }
    });
  }, [dataString, centerImage, errorCorrection, foreground, background]);

  const handleUploadCenterImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCenterImage(String(reader.result));
    reader.readAsDataURL(file);
  };

  const clearCenterImage = () => {
    setCenterImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const downloadPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const downloadSVG = async () => {
    try {
      const svg = await QRCode.toString(dataString, {
        type: "svg",
        errorCorrectionLevel: errorCorrection,
        color: {
          dark: `${foreground}ff`,
          light: `${background}ff`,
        },
      } as QRCodeToStringOptions);

      const blob = new Blob([svg], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-code.svg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      console.error("Failed to render QR to SVG", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        QR Code Generator
      </h1>
      <p className="text-gray-600 mb-6">
        Generate QR codes locally with multiple content types, optional center
        image, and easy downloads.
      </p>

      <div className="bg-white rounded-lg shadow p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            QR Content Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {(
              [
                { value: "text", label: "Text" },
                { value: "url", label: "URL" },
                { value: "wifi", label: "Wi‑Fi" },
                { value: "email", label: "Email" },
                { value: "sms", label: "SMS" },
              ] as Array<{ value: QRType; label: string }>
            ).map((opt) => (
              <label
                key={opt.value}
                className={`flex items-center gap-2 p-2 border rounded cursor-pointer ${
                  qrType === opt.value
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  className="text-blue-600"
                  name="qrtype"
                  value={opt.value}
                  checked={qrType === opt.value}
                  onChange={(e) => setQrType(e.target.value as QRType)}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Content Inputs */}
        {qrType === "text" || qrType === "url" ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {qrType === "url" ? "URL" : "Text"}
            </label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={
                qrType === "url" ? "https://example.com" : "Hello, World"
              }
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
        ) : null}

        {qrType === "wifi" ? (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SSID
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Network name"
                value={ssid}
                onChange={(e) => setSsid(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Network password"
                value={wifiPassword}
                onChange={(e) => setWifiPassword(e.target.value)}
                disabled={wifiAuth === "nopass"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Auth
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={wifiAuth}
                onChange={(e) =>
                  setWifiAuth(e.target.value as "WPA" | "WEP" | "nopass")
                }
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">Open (No password)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="hidden"
                type="checkbox"
                className="h-4 w-4"
                checked={wifiHidden}
                onChange={(e) => setWifiHidden(e.target.checked)}
              />
              <label htmlFor="hidden" className="text-sm text-gray-700">
                Hidden Network
              </label>
            </div>
          </div>
        ) : null}

        {qrType === "email" ? (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <input
                type="email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="name@example.com"
                value={emailTo}
                onChange={(e) => setEmailTo(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Body
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Message body"
                rows={3}
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
              />
            </div>
          </div>
        ) : null}

        {qrType === "sms" ? (
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="+1 555 555 5555"
                value={smsNumber}
                onChange={(e) => setSmsNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Hello!"
                value={smsBody}
                onChange={(e) => setSmsBody(e.target.value)}
              />
            </div>
          </div>
        ) : null}

        {/* Appearance */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foreground
            </label>
            <input
              type="color"
              className="w-full h-10 p-1 rounded border"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background
            </label>
            <input
              type="color"
              className="w-full h-10 p-1 rounded border"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Error Correction
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={errorCorrection}
              onChange={(e) =>
                setErrorCorrection(e.target.value as "L" | "M" | "Q" | "H")
              }
            >
              <option value="L">L (7%)</option>
              <option value="M">M (15%)</option>
              <option value="Q">Q (25%)</option>
              <option value="H">H (30%)</option>
            </select>
          </div>
        </div>

        {/* Center image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Center Image (optional)
          </label>
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleUploadCenterImage}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm text-gray-700 hover:bg-gray-50"
            >
              Choose Image
            </button>
            {centerImage && (
              <button
                type="button"
                onClick={clearCenterImage}
                className="inline-flex items-center px-3 py-2 border border-red-300 rounded-md shadow-sm bg-red-50 text-sm text-red-700 hover:bg-red-100"
              >
                Clear
              </button>
            )}
          </div>
          {centerImage && (
            <div className="mt-2 text-sm text-gray-600">Image loaded</div>
          )}
        </div>

        {/* Preview & Actions */}
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <canvas ref={canvasRef} className="border rounded bg-white mx-auto" />
          <div className="flex gap-3">
            <button
              onClick={downloadPNG}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download PNG
            </button>
            <button
              onClick={downloadSVG}
              className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
            >
              Download SVG
            </button>
          </div>
        </div>
      </div>
      {/* Info Cards */}
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            📦 Content Types
          </h3>
          <p className="text-blue-700 text-sm">
            Generate QR codes for Text/URL, Wi‑Fi (SSID, password, auth), Email
            (mailto with subject & body), and SMS (number + message).
          </p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-green-900 mb-2">
            🔒 Local Processing
          </h3>
          <p className="text-green-700 text-sm">
            Everything is generated in your browser. No data is sent to any
            server.
          </p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-purple-900 mb-2">
            🧩 Error Correction
          </h3>
          <p className="text-purple-700 text-sm">
            Choose L (7%), M (15%), Q (25%), or H (30%). Higher levels tolerate
            more damage or overlays.
          </p>
        </div>

        <div className="bg-orange-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-orange-900 mb-2">
            🖼️ Center Image
          </h3>
          <p className="text-orange-700 text-sm">
            Add a logo in the middle. For best scan reliability, use error
            correction level H and high contrast.
          </p>
        </div>

        <div className="bg-cyan-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-cyan-900 mb-2">
            ⬇️ Downloads
          </h3>
          <p className="text-cyan-700 text-sm">
            Export as PNG for quick sharing or SVG for crisp, scalable printing.
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-lg font-medium text-gray-900 mb-2">✅ Tips</h3>
          <p className="text-gray-700 text-sm">
            Keep sufficient quiet zone (margin), maintain contrast, and test
            with multiple devices.
          </p>
        </div>
      </div>
    </div>
  );
};

function escapeSemicolons(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillColor: string
) {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fillStyle = fillColor;
  ctx.fill();
  ctx.restore();
}

export default QRGenerator;
