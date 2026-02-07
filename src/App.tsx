import type { Component } from "solid-js";
import ShareCodeInspector from "./page/ShareCodeInspector";

const App: Component = () => {
    return (
        <>
            <div class="flex flex-wrap justify-between items-center px-2 py-5">
                <nav class="flex gap-2">
                    <a
                        class="p-2 text-2xl rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow-md active:bg-indigo-800 active:shadow-inner transition-all duration-200"
                        href="/"
                    >
                        🏠
                    </a>
                    <a
                        class="p-2 rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow-md active:bg-indigo-800 active:shadow-inner transition-all duration-200"
                        href="https://github.com/Absebo/hytale-share-code-inspector"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img
                            src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/github.svg"
                            alt="GitHub project"
                            style="width: 32px; height: 32px; filter: invert();"
                        />
                    </a>
                </nav>
                <h1 class="text-4xl text-green-700 text-center py-2 mx-auto">
                    Hytale share code inspector
                </h1>
                <div class="w-8"></div>
            </div>
            <main class="mx-8">
                <ShareCodeInspector />
                <article class="mt-5">
                    Note that this is a fully client side tool. The Hytale share
                    code is base64 encoded and compressed. This tool will decode
                    the share code by base64-decoding it and applying raw
                    DEFLATE decompression to obtain the decoded JSON share code.
                </article>
            </main>
        </>
    );
};

export default App;
