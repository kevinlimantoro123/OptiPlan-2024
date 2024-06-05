export default function HourSlot({ hour }) {
    return (
        <div className="-z-30 border border-gray-200 flex flex-col">
            <header className="flex flex-col items-end">
                <div className="h-24">
                    <p className={`text-m p-1 pr-4 my-1 text-center`}>
                        {hour}
                    </p>
                </div>
            </header>
        </div>
    )
}