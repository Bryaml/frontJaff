import React, { Fragment, useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = ({ onSelectSection, cart = [] }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const Segmentos = [
        {
            name: "DAMA",
            content: [
                { name: "Vestidos", url: "/sales" },
                { name: "Caminas", url: "/sales" },
                { name: "Ceremonia", url: "/sales" },
                { name: "Gran Gala", url: "/sales" },
            ]
        },
        {
            name: "CABALLEROS",
            content: [
                { name: "Camisas", url: "/sales" },
                { name: "Polos y Playeras", url: "/sales" },
                { name: "Chamarras", url: "/sales" },
                { name: "Ropa Interior", url: "/sales" },
                { name: "Trajes", url: "/sales" },
                { name: "Ceremonias", url: "/sales" },
                { name: "Pantalones", url: "/sales" },
                { name: "Shorts", url: "/sales" },
                { name: "Looks Completos", url: "/sales" },
                { name: "Blazer", url: "/sales" },
            ]
        },
        {
            name: "UNISEX",
            content: [
                { name: "Camisas", url: "/sales" },
                { name: "Chamarras", url: "/sales" },
            ]
        },
        {
            name: "HOGAR Y ESTILO DE VIDA",
            content: [
                { name: "Accesorios", url: "/sales" },
                { name: "Snacks", url: "/sales" },
                { name: "Bebidas", url: "/sales" },
                { name: "Ropa de Cama", url: "/sales" },
            ]
        },
        {
            name: "BOOKS",
            content: [
                { name: "COLECCIÓN 2023", url: "/sales" },
                { name: "COLECCIÓN 2022", url: "/sales" },
                { name: "COLECCIÓN 2021", url: "/sales" },
                { name: "COLECCIÓN 2020", url: "/sales" },
            ]
        },
        {
            name: "UNIFORMES EMPRESARIALES",
            content: [
                { name: "Camisas", url: "/sales" },
            ]
        },
    ];

    const handleClick = (category, subcategory) => {
        onSelectSection(category, subcategory);
    };

    const handleCartClick = () => {
        navigate('/cart');
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/login');
    };
    const handleFavoritesClick = () => {
        navigate('/favorites');
    };
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <div className="bg-black bg-opacity-75 hover:bg-opacity-100 duration-500 shadow-md w-full z-20 fixed top-0 left-0">
            <div className="w-11/12 flex items-center py-4 mx-auto justify-between">
                {/* Logo en el centro */}
                <div className="cursor-pointer flex justify-center items-center pb-4">
                    <a href="/">
                        <img src="../../src/assets/img/logo.png" alt="logo" className="h-12 ml-4 md:h-20 md:ml-0" />
                    </a>
                </div>

                {/* Íconos en la parte superior derecha */}
                <div className="flex items-center space-x-4">
                    <a href="#">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search hover:stroke-orange-400 duration-500" width="26" height="26" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                        </svg>
                    </a>
                    <button onClick={handleFavoritesClick} className="text-white relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart hover:stroke-orange-400 duration-500" width="26" height="26" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 21l-1 -1c-5 -4.65 -8 -7.62 -8 -11a5 5 0 0 1 10 0a5 5 0 0 1 10 0c0 3.38 -3 6.35 -8 11l-1 1z" />
                        </svg>
                    </button>
                    <button onClick={handleCartClick} className="text-white relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart hover:stroke-orange-400 duration-500" width="26" height="26" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="9" cy="19" r="2" />
                            <circle cx="17" cy="19" r="2" />
                            <path d="M17 17h-11v-14h-2" />
                            <path d="M6 5l14 1l-1 7h-13" />
                        </svg>
                        {totalItems > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 text-xs">{totalItems}</span>
                        )}
                    </button>
                    <button onClick={handleLoginClick} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle hover:stroke-orange-400 duration-500" width="26" height="26" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                        </svg>
                    </button>
                    <button onClick={handleLogoutClick} className="text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x hover:stroke-orange-400 duration-500" width="26" height="26" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ffffff" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Lista de segmentos abajo */}
            <div className={`w-11/12 mx-auto ${menuOpen ? 'block' : 'hidden'} md:flex md:justify-center`}>
                <ul className="md:flex flex-wrap justify-center text-center whitespace-nowrap">
                    {Segmentos.map((segmento) => (
                        <li key={segmento.name} className="text-x1 px-4 py-2 md:w-auto md:whitespace-nowrap md:flex-1">
                            <Popover className="relative">
                                {({ open }) => (
                                    <>
                                        <Popover.Button
                                            className={`${open ? 'text-orange-400 border-orange-400 border-b-2' : 'text-white'
                                                } hover:text-orange-400 hover:border-orange-400 duration-500 border-b-2 border-transparent w-full`}
                                        >
                                            {segmento.name}
                                        </Popover.Button>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="opacity-0 translate-y-1"
                                            enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel className="absolute z-10 w-full">
                                                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white">
                                                    <div className="py-4">
                                                        <ul>
                                                            {segmento.content.map((contenido, index) => (
                                                                <li key={index} className="mb-2 border-b-2 pb-1 border-transparent hover:border-zinc-300 duration-500">
                                                                    <a className="px-12" href={contenido.url} onClick={() => handleClick(segmento.name, contenido.name)}>{contenido.name}</a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </>
                                )}
                            </Popover>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;