import React from "react";

const MovieTabs = (props) =>{
    const {sort_by, updateSortBy, updateTotalPages} = props;
    const handleClick = value => () => {
        updateTotalPages(value)
        updateSortBy(value);

    };
    const getClassLink = value => {
        return `nav-link ${
            sort_by === value ? 'active' : ''
        }`
    };

    return(
        <ul className="tabs nav nav-pills mt-3 mb-3">
            <li className="nav-item">
                <div className={getClassLink('popularity.desc')}
                     onClick={handleClick('popularity.desc')}
                >
                    Popularity desc
                </div>
            </li>
            <li className="nav-item">
                <div className={getClassLink('revenue.desc')}
                     onClick={handleClick('revenue.desc')}
                >
                    Revenue desc
                </div>
            </li>
            <li className="nav-item">
                <div className={getClassLink('vote_average.desc')}
                     onClick={handleClick('vote_average.desc')}
                >
                    Vote average desc
                </div>
            </li>
        </ul>

    )
}

export default MovieTabs