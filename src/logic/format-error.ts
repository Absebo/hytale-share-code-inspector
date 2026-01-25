import type { $ZodError, $ZodIssue } from "zod/v4/core";
import { toDotPath } from "zod/v4/core";

function formatZodIssue(issue: $ZodIssue, parentPath: string): string[] {
    const path =
        (parentPath === "" ? "" : parentPath + ".") + toDotPath(issue.path);
    switch (issue.code) {
        case "invalid_union": {
            return issue.errors
                .flatMap((issues) => issues)
                .flatMap((issue) => formatZodIssue(issue, path));
        }
        case "invalid_format": {
            return [`${path} - ${issue.message} for ${issue.format}`];
        }
        case "invalid_type": {
            return [`${path} - ${issue.message}. Expected ${issue.expected}`];
        }
        case "too_big": {
            return [`${path} - Value is above ${issue.maximum}`];
        }
        case "too_small": {
            return [`${path} - Value is below ${issue.minimum}`];
        }
        case "invalid_value": {
            return [
                `${path} - Only these values are allowed: ${issue.values.join(", ")}`,
            ];
        }
        default: {
            return [`${path} - ${issue.message} ${issue.code}`];
        }
    }
}

export function formatZodError(error: $ZodError): string[] {
    return error.issues.flatMap((issue) => formatZodIssue(issue, ""));
}
