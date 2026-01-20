import { createSignal, For, Show } from "solid-js";
import {
    decodeShareCode,
    encodeShareCode,
    parseShareCode,
} from "./hytale-share-code";
import { StyledButton } from "./StyledButton";
import { StyledTextarea } from "./StyledTextarea";
import type { ZodError } from "zod";

const DEFAULT_SHARE_CODE =
    "PY5NiwIxDIb/ytKzlcaZrdu5iSx4URYcEVz2UKdRCrN2SOvHIP5300FMckjyJk9yF4sQ08r+o6jEsq8xpndjNGibs3esHQih0BakbsxeluZLy/1UOQmTovxEaxqwDW+skS5IL97an44tdq3tkT62gVrHEz82xmugzHynI/F96zxhnCVuT1ShpAIJtVLVEGM12I4H5/bkvLMJo6h+76Luu3wpP8rizDmGsCJAmzFkzxcDMbY0egpckA/kUy8qYOLj7/EE";

export default function ShareCodeInspector() {
    const [shareCode, setShareCode] = createSignal("");
    const [shareCodeJson, setShareCodeJson] = createSignal("");
    const [errors, setErrors] = createSignal<string[]>([]);
    onShareCodeInput(DEFAULT_SHARE_CODE);

    function onShareCodeInput(value: string) {
        setShareCode(value);
        if (value === "") {
            return;
        }
        try {
            const decoded = decodeShareCode(value);
            setShareCodeJson(decoded);
            setErrors([]);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                setErrors(["Share code is invalid"]);
            } else if (typeof err === "string") {
                setErrors([err]);
            }
            setShareCodeJson("");
        }
    }

    function onShareCodeJsonInput(value: string) {
        setShareCodeJson(value);
        if (value === "") {
            return;
        }
        try {
            const encoded = encodeShareCode(value);
            setShareCode(encoded);
            setErrors([]);
        } catch (err) {
            console.error(err);
            if (err !== null && typeof err === "object" && "issues" in err) {
                const error = err as ZodError;
                setErrors(
                    error.issues.map(
                        (issue) =>
                            `${issue.path.join(".")} - ${issue.code} ${issue.message}`,
                    ),
                );
            } else if (err instanceof Error) {
                setErrors([err.message]);
            } else if (typeof err === "string") {
                setErrors([err]);
            }
            setShareCode("");
        }
    }

    function removeButTailscale() {
        const parsed = parseShareCode(shareCodeJson());
        parsed.Candidates = parsed.Candidates.filter(
            (candidate) =>
                candidate.Type === "Host" &&
                candidate.Address.startsWith("100.127"),
        );
        onShareCodeJsonInput(JSON.stringify(parsed, null, 2));
    }
    return (
        <div class="grid gap-3">
            <label for="share-code">Original Hytale Share Code</label>
            <StyledTextarea
                class="h-25"
                id="share-code"
                onInput={(it) => onShareCodeInput(it.target.value)}
                value={shareCode()}
            ></StyledTextarea>
            <label for="share-code-json">
                Human readable Hytale Share Code
            </label>
            <StyledTextarea
                class="h-100"
                id="share-code-json"
                onInput={(it) => onShareCodeJsonInput(it.target.value)}
                value={shareCodeJson()}
            ></StyledTextarea>
            <Show when={errors().length > 0}>
                <span class="text-red-700">Errors:</span>
                <ul class="text-red-700">
                    <For each={errors()}>{(item) => <li>{item}</li>}</For>
                </ul>
            </Show>
            <div class="flex flex-row gap-2">
                <StyledButton
                    onClick={() => onShareCodeInput(DEFAULT_SHARE_CODE)}
                >
                    Reset to example
                </StyledButton>
                <StyledButton onClick={() => removeButTailscale()}>
                    Remove everything but tailscale IP
                </StyledButton>
            </div>
        </div>
    );
}
