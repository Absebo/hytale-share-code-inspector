import { JSX } from "solid-js";

export function StyledTextarea(
    props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
    console.info(props.class);
    return (
        <textarea
            {...props}
            class={
                "w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 shadow-sm resize-none dark:border-gray-700 transition-colors duration-200 " +
                (props.class || "")
            }
        ></textarea>
    );
}
