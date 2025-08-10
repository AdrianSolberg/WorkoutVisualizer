export function SiteHeader() {
    return (
        <header className="flex items-center gap-2 border-b py-2">
            <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                <img src="/logo.svg" alt="Logo" className="h-12 w-auto" />
                <h1 className="text-base font-medium">Workout Visualizer</h1>
            </div>
        </header>
    );
}
