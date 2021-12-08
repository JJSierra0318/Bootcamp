import React from "react";

const AddedNotification = ({message}) => {
    if (message === null) return null

    return (
        <div className='Added'>
            {message}
        </div>
    )
}

export default AddedNotification