export async function loadScript(scriptName: string): Promise<HTMLScriptElement> {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = scriptName;
        script.async = true;

        script.onload = () => {
            // Script has loaded successfully
            resolve(script);
        };
        script.onerror = () => {
            // Handle script load error
            reject(new Error(`Failed to load script: ${scriptName}`));
        };

        document.body.appendChild(script);
    });
}

export async function loadStyle(styleName: string): Promise<HTMLLinkElement> {
    return new Promise((resolve, reject) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = styleName;

        link.onload = () => resolve(link);
        link.onerror = () => reject(new Error(`Failed to load CSS: ${styleName}`));
        
        document.head.appendChild(link);
    });
}