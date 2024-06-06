import React, { useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import GlobalContext from "../../context/GlobalContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ViewSelector() {

    const{ selectedCalView, setSelectedCalView } = useContext(GlobalContext);

    return (
        <Menu as="div" className="relative inline-block text-left">
        <div>
            <MenuButton className="inline-flex w-24 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                {selectedCalView.charAt(0).toUpperCase() + selectedCalView.slice(1)}
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
            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
                <MenuItem>
                {({ focus }) => (
                    <a
                    onClick={() => setSelectedCalView("month")}
                    className={classNames(
                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm cursor-pointer'
                    )}
                    >
                    Month
                    </a>
                )}
                </MenuItem>
                <MenuItem>
                {({ focus }) => (
                    <a
                    onClick={() => setSelectedCalView("week")}
                    className={classNames(
                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm cursor-pointer'
                    )}
                    >
                    Week
                    </a>
                )}
                </MenuItem>
                <MenuItem>
                {({ focus }) => (
                    <a
                    onClick={() => setSelectedCalView("day")}
                    className={classNames(
                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm cursor-pointer'
                    )}
                    >
                    Day
                    </a>
                )}
                </MenuItem>
            </div>
            </MenuItems>
        </Transition>
        </Menu>
    )
}
