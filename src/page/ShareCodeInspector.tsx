import { createEffect, createSignal, For, Show } from "solid-js";
import type { $ZodError } from "zod/v4/core";

import {
    decodeShareCode,
    encodeShareCode,
    parseShareCode,
} from "../logic/hytale-share-code";
import { formatZodError } from "../logic/format-error";
import { StyledButton } from "../component/StyledButton";
import { TextareaWithCopy } from "../component/TextareaWithCopy";

const DEFAULT_SHARE_CODE =
    "PY5Ri8IwDMe/S5+tNG5X7d6GHPiiHDgRPO6hrvEoTDvS3ukQv7vpEJM8JPknv+QuViGmjT2jqMR6aDCmd2Myars/71g7EUKhLUjdmqMszULL41w5CbOi/EBrWrAtb2yR/pFevK2//HbYd3ZA2gfqHA982RivgTLynU7E5633hLFO3J6pQkkFHI1S1RhTNdqBJ5f24ryzCaOovu+iGfp8KT/KYu0cU1gRoM0UsueTgZhbGj0HLsgH8mkQFTDx8fN4Ag==";

export default function ShareCodeInspector() {
    const [shareCode, setShareCode] = createSignal("");
    const [shareCodeJson, setShareCodeJson] = createSignal("");
    const [errors, setErrors] = createSignal<string[]>([]);
    const [warnings, setWarnings] = createSignal<string[]>([]);
    const errorsAndWarnings = () => [...errors(), ...warnings()];

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
                setErrors([err.message]);
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
            if (err instanceof Error) {
                setErrors([err.message]);
            } else if (typeof err === "string") {
                setErrors([err]);
            }
            setShareCode("");
        }
    }

    createEffect(() => {
        const jsonString = shareCodeJson();
        if (jsonString === "" || errors().length > 0) {
            setWarnings([]);
            return;
        }
        try {
            parseShareCode(jsonString);
            setWarnings([]);
        } catch (err) {
            console.error(err);
            if (err !== null && typeof err === "object" && "issues" in err) {
                setWarnings(formatZodError(err as $ZodError));
            } else if (err instanceof Error) {
                setWarnings([err.message]);
            } else if (typeof err === "string") {
                setWarnings([err]);
            }
        }
    });

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
            <TextareaWithCopy
                class="h-30"
                id="share-code"
                onInput={(it) => onShareCodeInput(it.target.value)}
                value={shareCode()}
            ></TextareaWithCopy>
            <label for="share-code-json">
                Human readable Hytale Share Code
            </label>
            <TextareaWithCopy
                class="h-100"
                id="share-code-json"
                onInput={(it) => onShareCodeJsonInput(it.target.value)}
                value={shareCodeJson()}
            ></TextareaWithCopy>
            <Show when={errorsAndWarnings().length > 0}>
                <div class="bg-red-400 rounded-lg p-3">
                    <span>Errors:</span>
                    <ul class="list-disc ml-4">
                        <For each={errorsAndWarnings()}>
                            {(item) => <li>{item}</li>}
                        </For>
                    </ul>
                </div>
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
