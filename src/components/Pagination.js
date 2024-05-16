import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="mt-4 flex justify-center">
            <ul className="flex space-x-2">
                {pages.map((page) => (
                    <li key={page}>
                        <button
                            className={`px-3 py-1 rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-blue-500 hover:text-white'}`}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Pagination;
