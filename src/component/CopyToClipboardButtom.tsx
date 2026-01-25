import { createSignal, JSX } from "solid-js";

export function CopyToClipboardButton(
    props: JSX.ButtonHTMLAttributes<HTMLButtonElement>,
) {
    const [clipboardEffect, setClipboardEffect] = createSignal(false);
    function copyToClipboard() {
        navigator.clipboard.writeText(props.value ?? "");
        setClipboardEffect(true);
        setTimeout(() => setClipboardEffect(false), 200);
    }
    return (
        <button
            {...props}
            class={
                "px-3 py-2.5 rounded-lg bg-indigo-600 shadow-sm hover:bg-indigo-700 hover:shadow-md active:bg-indigo-800 active:shadow-inner transition-all duration-200 " +
                (props.class || "")
            }
            onClick={() => copyToClipboard()}
        >
            <span>📋</span>
            <span
                style={{ opacity: clipboardEffect() ? 100 : 0 }}
                class={
                    "absolute transition-transform duration-200 right-3 bottom-2.5 " +
                    (clipboardEffect() ? "transform-[translateY(-3rem)]" : "")
                }
            >
                📋
            </span>
        </button>
    );
}
