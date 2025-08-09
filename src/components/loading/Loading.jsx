const Loading = ({ isLoading, error, loadingType, mainText, subText, errorComp, loadedComp}) => {
    // loadingType is small or big
    return (
        <>
            {
                isLoading ? (
                    loadingType == "big" ? (
                        <div className="flex flex-col items-center justify-center h-32 animate-pulse">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-orange-300 via-orange-100 to-yellow-200 flex items-center justify-center mb-3 shadow-lg">
                                <svg className="animate-spin h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                </svg>
                            </div>
                            <span className="text-orange-600 text-lg font-semibold"> {mainText} </span>
                            <span className="text-gray-400 text-sm mt-1"> {subText} </span>
                        </div>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-5 w-5 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                            </svg>
                            {mainText}
                        </span>
                    )
                ) : error ? (
                    errorComp
                ) : (
                    loadedComp
                )
            }
        </>
    );
}

export default Loading;