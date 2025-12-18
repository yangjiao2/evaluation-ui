import React from 'react';
import { Constants } from '@/utils/app/const';
import { getInitials } from '@/utils/app/helper';

export const UserAvatar = ({src = '', height = 30, width = 30}) =>  {
    const fullName = sessionStorage.getItem("name");
    const user = sessionStorage.getItem("user");
    const profilePicUrl = src || `${Constants.HELIOS_BASE_URL}img/user-photos/${user}.jpg`
    const initials = getInitials(fullName || '');


    return <img 
        src={profilePicUrl} 
        alt={initials}
        width={width}
        height={height}
        // title={fullName}
        className='rounded-full max-w-full h-auto border border-[#76b900]'
        // onError={onError}
    />

}

export default UserAvatar;