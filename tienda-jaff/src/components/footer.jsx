import React from 'react';

const Footer = () => {
    return (
        <footer className={'footer block w-full'}>
            <div className="bg-zinc-800 text-white py-4 text-center">
                <div className="mx-auto px-4 md:w-1/5">
                    <div className="w-full">
                        <div className="flex space-x-4 justify-between pb-5">
                            <a href="https://www.facebook.com/Jaffantoniofigueroa/" target="_blank" rel="noopener noreferrer" title="Facebook">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/jaffantoniofigueroa/" target="_blank" rel="noopener noreferrer" title="Instagram">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                    <path d="M16.5 7.5l0 .01" />
                                </svg>
                            </a>
                            <a href="https://www.tiktok.com/@jaffantoniofigueroa" target="_blank" rel="noopener noreferrer" title="TikTok">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-tiktok" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M21 7.917v4.034a9.948 9.948 0 0 1 -5 -1.951v4.5a6.5 6.5 0 1 1 -8 -6.326v4.326a2.5 2.5 0 1 0 4 2v-11.5h4.083a6.005 6.005 0 0 0 4.917 4.917z" />
                                </svg>
                            </a>
                            <a href="https://youtube.com/c/JAFFAntonioFigueroa" target="_blank" rel="noopener noreferrer" title="YouTube">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-youtube" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
                                    <path d="M10 9l5 3l-5 3z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="text-xs">
                    © 2024 Antonio Figueroa JAFF, Inc. All rights reserved.
                </div>
                <div class="mt-5 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-white">
                    <a href="mailto:jaredjuarez46@gmail.com?subject=Contacto%20de%20tienda%20en%20linea%20JAFF" target='_blank' rel='noopener noreferrer'>Contactanos</a>
                    <div class="h-4 w-px bg-slate-500/20"></div>
                    <a href="https://api.whatsapp.com/qr/KNN7JNIREKRNF1?autoload=1&app_absent=0" target='_blank' rel='noopener noreferrer'>Agenda tu cita</a></div>
            </div>
        </footer>
    );
}

export default Footer;
