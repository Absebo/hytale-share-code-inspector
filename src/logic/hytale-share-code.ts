import pako from "pako";
import * as z from "zod/mini";

const shareCodeSchema = z.object({
    HostName: z.string(),
    HostUuid: z.string(),
    ServerName: z.string(),
    Password: z.optional(z.string()),
    ExpiresAt: z.string(),
    Candidates: z.array(
        z.object({
            Type: z.enum(["Host", "UPnP", "ServerReflexive"]),
            Address: z.union([z.ipv4(), z.ipv6(), z.hostname()]),
            Port: z.number().check(z.minimum(1), z.maximum(65535)),
            Priority: z.number(),
        }),
    ),
});

export type ShareCode = z.infer<typeof shareCodeSchema>;

function base64ToBytes(b64: string) {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes;
}

function bytesToBase64(bytes: Uint8Array): string {
    let bin = "";
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
}

// decode: Base64 (raw DEFLATE) → JSON object
export function decodeShareCode(b64: string): string {
    const rawBytes = base64ToBytes(b64);
    const decoded = pako.inflateRaw(rawBytes, { to: "string" });
    if (decoded === void 0) {
        throw new Error("Share code is invalid. Unable to decode");
    }
    try {
        return JSON.stringify(JSON.parse(decoded), null, 2);
    } catch {
        // only format this as a json string if possible
        return decoded;
    }
}

// encode: JSON object → Base64 (raw DEFLATE)
export function encodeShareCode(jsonStr: string): string {
    const withoutSpaces = jsonStr.replace(/\s/g, "");
    const rawBytes = pako.deflateRaw(withoutSpaces);
    return bytesToBase64(rawBytes);
}

export function parseShareCode(text: string): ShareCode {
    return shareCodeSchema.parse(JSON.parse(text));
}
