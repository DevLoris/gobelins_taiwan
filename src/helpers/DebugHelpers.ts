/**
 * Returns true if is localhost
 * @return boolean
 */
export function isLocal(): boolean {
    return (
        location.hostname === "localhost"
        || location.hostname === "127.0.0.1"
        || location.hostname.includes("192")
        || location.hostname.includes("172")
    )
}

/**
 * Return true if ?debug=true is in url
 * @return boolean
 */
export function isUrlDebug(): boolean {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const debugParam = urlSearchParams.get("debug");

    return Boolean(debugParam !== null && debugParam);
}

/**
 * Get chapter and step params in url
 * @return string[] | string
 */
export function getChapterAndStepInUrl(): string[] {
    const urlSearchParams = new URLSearchParams(window.location.search);

    const chapter = urlSearchParams.get("chapter")?.toUpperCase();
    const step = urlSearchParams.get("step")?.toUpperCase();

    return chapter || step ? [chapter, step] : null;
}
