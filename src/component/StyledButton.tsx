import { JSX } from "solid-js";

export function StyledButton(
    props: JSX.ButtonHTMLAttributes<HTMLButtonElement>,
) {
    return (
        <button
            {...props}
            class={
                "px-5 py-2.5 rounded-lg bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 hover:shadow-md active:bg-indigo-800 active:shadow-inner transition-all duration-200" +
                (props.class || "")
            }
        />
    );
}
