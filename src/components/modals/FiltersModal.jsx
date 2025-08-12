const FiltersModal = ({ handleClose }) => {
    return (
        <div className="fixed min-h-screen w-full z-50 flex justify-center items-center">
            <span 
                className="fixed min-h-screen w-full bg-black opacity-75 "
                onClick={handleClose}       
                >
            </span>
            <form onSubmit={handleClose} className="z-51 bg-white rounded p-5 flex flex-col">
                <header> Filters </header>
                    <main>
                        <div className="flex flex-col">
                            <span> Type </span>
                            <input 
                                type="checkbox" 
                            >

                            </input>
                        </div>
                        <div className="flex flex-col">
                            <span> Cusine </span>
                            <input 
                                type="checkbox" 
                            >
                                
                            </input>
                        </div>
                        <div className="flex flex-col">
                            <span> Diet </span>
                            <input 
                                type="checkbox" 
                            >
                                
                            </input>
                        </div>
                        <div className="flex flex-col">
                            <span> Intolerances </span>
                            <input 
                                type="checkbox" 
                            >
                                
                            </input>
                        </div>
                        <div className="flex flex-col">
                            <span> Ready Time </span>
                            <input 
                                type="checkbox" 
                            >
                                
                            </input>
                        </div>
                </main>
                <button
                    className="bg-gray-300 cursor-pointer rounded p-2 px-4"
                    type="search"
                    onClick={handleClose}
                    > 
                    Close
                </button>
            </form>
        </div>
    );
}

export default FiltersModal;