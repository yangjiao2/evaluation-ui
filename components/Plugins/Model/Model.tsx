import HomeContext from '@/pages/api/home/home.context';
import React, { useContext, useEffect, useState } from 'react'

const Model = () => {
    const {
        state: { selectedModel, appConfig },
        dispatch,
    } = useContext(HomeContext);
    const llmModels = appConfig.supportedModels ?? [];

    useEffect( () => {
        if(appConfig.supportedModels.length === 1) {
            dispatch({
                field: 'selectedModel',
                value: appConfig.supportedModels[0]?.id
            })
        }
    }, [])

    return (
        <div>
            <select
              className="w-20 cursor-pointer bg-transparent p-2 text-white dark:text-neutral-200"
              value={selectedModel}
              disabled={llmModels.length <= 1}
              onChange={(event) => {
                dispatch({ field: 'selectedModel', value: event.target.value })
              }}
            >
                {llmModels.map((llm, index) => {
                    return <option key={index} value={llm?.id}>{llm?.name}</option>
                })}
            </select>
        </div>

    )
}

export default Model
