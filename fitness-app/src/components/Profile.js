/*Dependencies*/
import React from "react";

/*Components*/

/*Stylesheets*/
import '../stylesheets/Profile.css';

// eslint-disable-next-line
{/*Displays user image, buttons to mavigate to Calendar and Difficulty components, line graph displaying workouts over a month*/}
function Profile({ loggedInUser }){


    return (
        <>
            <img src={ loggedInUser.image } alt="Your profile" />
        </>
    )
};

export default Profile;