import {  createContext } from "react";

export const storeContext=createContext();


export const StoreContextProvider=({children})=>{

    const url='http://localhost:5010'

    const value={
        url
    }

    return (
        <storeContext.Provider value={value}>
                {children}
        </storeContext.Provider>
    )
}