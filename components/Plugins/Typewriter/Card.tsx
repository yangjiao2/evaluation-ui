import React from "react";
import _ from "lodash";

const CardMessage = (props: any) => {
    let data = props?.payload;
    let markup = null;
    
    if(!_.isEmpty(data?.Fields)){
        markup = data.Fields.map((field: any, index: any) => {
            return (
                <div key={index} className="pl-2">
                    <span className="inline-block pl-2 text-gray-600 w-36">{field?.FieldLabel}: </span>
                    <span>{field?.FieldValue}</span>
                </div>
            );
        });
    }
    
    return (
        <div className="bg-white shadow rounded-lg">
            <div className="flex justify-between items-center font-semibold p-2">
                <div>{data?.Title}</div>
                <div><a href={data?.Url} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-600">{data?.SubTitle}</a></div>
            </div>
            <div className="pl-2">
                {markup}
            </div>
        </div>
    )
};

export default CardMessage;
