import type { Component } from "solid-js";
import ShareCodeInspector from "./page/ShareCodeInspector";

const App: Component = () => {
    return (
        <>
            <div class="flex justify-between items-center px-8 py-1">
                <nav>
                    <a
                        class="px-2 py-1 text-2xl rounded-lg bg-indigo-600 text-white shadow-sm hover:bg-indigo-700 hover:shadow-md active:bg-indigo-800 active:shadow-inner transition-all duration-200"
                        href="/"
                    >
                        ←
                    </a>
                </nav>
                <h1 class="text-4xl text-green-700 text-center py-2 mx-auto">
                    Hytale share code inspector
                </h1>
            </div>
            <main class="mx-8">
                <ShareCodeInspector />
                <article class="mt-5">
                    Note that this is a fully client side tool. The Hytale share
                    code is base64 encoded. This tool will decode the base64
                    encoded share code. After that it applies a raw deflate
                    compression and show the result.
                </article>
            </main>
        </>
    );
};

export default App;
