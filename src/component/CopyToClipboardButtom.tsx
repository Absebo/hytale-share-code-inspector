import { JSX } from "solid-js";

export function CopyToClipboardButton(
    props: JSX.ButtonHTMLAttributes<HTMLButtonElement>,
) {
    function copyToClipboard() {
        navigator.clipboard.writeText(props.value ?? "");
    }
    return (
        <button
            {...props}
            class={
                "px-3 py-2.5 rounded-lg bg-indigo-600 shadow-sm hover:bg-indigo-700 hover:shadow-md active:bg-indigo-800 active:shadow-inner transition-all duration-200 " +
                (props.class || "")
            }
            onClick={(event) => copyToClipboard()}
        >
            📋
        </button>
    );
}
