import React, { useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import GlobalContext from "../../context/GlobalContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AnalyticsSelector() {

    const{ analyticsView, setAnalyticsView } = useContext(GlobalContext);

    return (
        <Menu as="div" className="relative inline-block text-left">
        <div>
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 bg-neutral-900 px-3 py-1.5 text-m font-semibold text-neutral-200 hover:text-white">
                <div className="flex">
                    {analyticsView}
                    <span className="material-icons-outlined ml-1">
                      arrow_drop_down
                    </span>
                </div>
            </MenuButton>
        </div>

        <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <MenuItems className="absolute right-0 z-10 mt-5 w-56 origin-top-right rounded-md bg-zinc-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                <MenuItem>
                {({ focus }) => (
                    <a
                    onClick={() => setAnalyticsView("Total Event Count")}
                    className={classNames(
                        focus ? 'bg-neutral-500 text-neutral-200' : 'text-neutral-200',
                        'block px-4 py-2 text-sm cursor-pointer'
                    )}
                    >
                    Total Event Count
                    </a>
                )}
                </MenuItem>
                <MenuItem>
                {({ focus }) => (
                    <a
                    onClick={() => setAnalyticsView("Time Spent on Events")}
                    className={classNames(
                        focus ? 'bg-neutral-500 text-neutral-200' : 'text-neutral-200',
                        'block px-4 py-2 text-sm cursor-pointer'
                    )}
                    >
                    Time Spent on Events
                    </a>
                )}
                </MenuItem>
                <MenuItem>
                {({ focus }) => (
                    <a
                    onClick={() => setAnalyticsView("Year Chart")}
                    className={classNames(
                        focus ? 'bg-neutral-500 text-neutral-200' : 'text-neutral-200',
                        'block px-4 py-2 text-sm cursor-pointer'
                    )}
                    >
                    Year Chart
                    </a>
                )}
                </MenuItem>
            </div>
            </MenuItems>
        </Transition>
        </Menu>
    )
}
