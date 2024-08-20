import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import { getProductsByCategoryAndSubcategory } from '../services/saleService';
import { addFavorite } from '../services/favoriteService';
import { useNavigate } from "react-router-dom";

const Sales = () => {
    const [hoveredProductId, setHoveredProductId] = useState(null);
    const [currentImageIndices, setCurrentImageIndices] = useState({});
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedSegment, setSelectedSegment] = useState('');
    const [products, setProducts] = useState([]);
    const serverBaseUrl = "http://localhost:8080";
    const navigate = useNavigate();

    useEffect(() => {
        const storedSection = localStorage.getItem('selectedSection');
        const storedSegment = localStorage.getItem('selectedSegment');
        if (storedSection) setSelectedSection(storedSection);
        if (storedSegment) setSelectedSegment(storedSegment);

        if (storedSection && storedSegment) {
            fetchProductsByCategoryAndSubcategory(storedSection, storedSegment);
        }
    }, []);

    const fetchProductsByCategoryAndSubcategory = async (category, subcategory) => {
        try {
            const data = await getProductsByCategoryAndSubcategory(category, subcategory);
            console.log('Fetched products:', data);
            setProducts(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching products:', error);
            setProducts([]);
        }
    };

    const handleNextImage = (productId) => {
        setCurrentImageIndices((prevState) => {
            const newIndex = ((prevState[productId] || 0) + 1) % (products.find(p => p.productId === productId).images.length);
            return {
                ...prevState,
                [productId]: newIndex,
            };
        });
    };

    const handlePrevImage = (productId) => {
        setCurrentImageIndices((prevState) => {
            const images = products.find(p => p.productId === productId).images;
            const newIndex = ((prevState[productId] || 0) - 1 + images.length) % images.length;
            return {
                ...prevState,
                [productId]: newIndex,
            };
        });
    };

    const getCurrentImageIndex = (productId) => {
        return currentImageIndices[productId] || 0;
    };

    const handleSelectSection = (sectionName, segmentName) => {
        setSelectedSection(sectionName);
        setSelectedSegment(segmentName);
        localStorage.setItem('selectedSection', sectionName);
        localStorage.setItem('selectedSegment', segmentName);
        fetchProductsByCategoryAndSubcategory(sectionName, segmentName);
    };

    const getImageUrl = (product) => {
        if (product.images && product.images.length > 0) {
            const currentImageIndex = getCurrentImageIndex(product.productId);
            const currentImage = product.images[currentImageIndex];
            if (currentImage && currentImage.imagePath) {
                const url = `${serverBaseUrl}${currentImage.imagePath}`;
                console.log(`Image URL for product ${product.productId}: ${url}`);
                return url;
            }
        }
        console.log(`No image URL for product ${product.productId}`);
        return '';
    };
    const handleAddFavorite = async (productId) => {
        const customer = JSON.parse(localStorage.getItem('customer'));
        if (!customer) {
            alert('Debes iniciar sesión para agregar productos a favoritos.');
            return;
        }
    
        try {
            const response = await addFavorite(productId);
            console.log('Favorite added:', response);
        } catch (error) {
            console.error('Error adding favorite:', error);
        }
    };
    

    return (
        <>
            <Navbar onSelectSection={handleSelectSection} />
            <div className="bg-white mt-28 mx-10 lg:mx-0">
                <div className="py-16 sm:py-24">
                    <div className="text-center mb-10">
                        <h3 className="text-sm font-bold">{selectedSegment}</h3>
                        <h1 className="text-3xl font-bold">{selectedSection}</h1>
                    </div>
                    <div className="flex flex-wrap">
                        {Array.isArray(products) && products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    key={product.productId}
                                    className={`group relative w-full h-full sm:w-1/2 lg:w-1/4 transition-all duration-300 ${hoveredProductId === product.productId ? 'border border-black' : ''}`}
                                    onMouseEnter={() => setHoveredProductId(product.productId)}
                                    onMouseLeave={() => setHoveredProductId(null)}
                                    onClick={() => {
                                        console.log(`Navigating to product: ${product.productId}`);
                                        navigate(`/product/${product.productId}`);
                                    }}
                                >
                                    <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-sm bg-gray-200 lg:aspect-none lg:h-full relative">
                                        <img
                                            src={getImageUrl(product)}
                                            alt={product.name}
                                            className="h-full w-full object-cover object-center lg:h-full lg:w-full transition-opacity duration-500"
                                        />
                                        {hoveredProductId === product.productId && product.images && product.images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handlePrevImage(product.productId);
                                                    }}
                                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full p-2 z-10"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M15 6l-6 6l6 6" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleNextImage(product.productId);
                                                    }}
                                                    className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full p-2 z-10"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M9 6l6 6l-6 6" />
                                                    </svg>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                    <div className="flex justify-around p-2">
                                        <div>
                                            <h3 className="text-gray-700">
                                                <a href={`/product/${product.productId}`}>
                                                    <span aria-hidden="true" className="absolute inset-0" />
                                                    {product.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-gray-500">{product.color}</p>
                                        </div>
                                        <p className="font-medium text-gray-900">{product.price}</p>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleAddFavorite(product.productId);
                                        }} 
                                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#000000" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M12 21c-4.97 0 -9 -4.03 -9 -9c0 -2.21 0.895 -4.21 2.344 -5.656c1.449 -1.449 3.445 -2.344 5.656 -2.344c2.21 0 4.21 0.895 5.656 2.344c1.449 1.449 2.344 3.445 2.344 5.656c0 4.97 -4.03 9 -9 9z" />
                                            <path d="M12 13l-1 -1" />
                                            <path d="M12 13l1 -1" />
                                        </svg>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No products available</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sales;

