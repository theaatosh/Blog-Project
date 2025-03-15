import {  createContext } from "react";

export const storeContext=createContext();


export const StoreContextProvider=({children})=>{

    const url='http://localhost:3000'

    const value={
        url
    }

    return (
        <storeContext.Provider value={value}>
                {children}
        </storeContext.Provider>
    )
}