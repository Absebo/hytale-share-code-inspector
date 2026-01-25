import { JSX } from "solid-js";
import { StyledTextarea } from "./StyledTextarea";
import { CopyToClipboardButton } from "./CopyToClipboardButtom";

export function TextareaWithCopy(
    props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
    return (
        <div class="relative">
            <CopyToClipboardButton
                class="absolute right-0 bottom-0"
                value={String(props.value)}
            />
            <StyledTextarea {...props}></StyledTextarea>
        </div>
    );
}
