import React from 'react';

const Field = ({value, onChange, type = "text", edit, placeholder}) => {
    return ( 
        <div className="mx-auto p-1 pr-0 flex items-center">
            <input type={type} className="flex-1 appearance-none rounded shadow p-3 text-grey-dark mr-2 focus:outline-none" value={value} onChange={onChange} placeholder={placeholder} />
            <button className="bg-green-500 px-5 py-2 text-white hover:bg-green-400 font-semibold tracking-wide uppercase rounded shadow" type="submit" >{edit === null ? "Ajouter" : "Modifier"}</button>
        </div>
     );
}
 
export default Field;