export default function HourSlot({ hour }) {
    return (
        <div className="z-0 border-t-2 border-neutral-900 bg-neutral-900 flex flex-col hover:border-neutral-200 transition-colors duration-150 ease-in-out">
            <header className="flex flex-col items-end">
                <div className="h-10">
                    <p className="text-m p-1 pr-4 my-1 text-center text-neutral-200">
                        {hour}
                    </p>
                </div>
            </header>
        </div>
    )
}