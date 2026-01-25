import type { Component } from "solid-js";
import ShareCodeInspector from "./page/ShareCodeInspector";

const App: Component = () => {
    return (
        <>
            <h1 class="text-4xl text-green-700 text-center py-2">
                Hytale share code inspector
            </h1>
            <main class="mx-8">
                <ShareCodeInspector />
            </main>
        </>
    );
};

export default App;
