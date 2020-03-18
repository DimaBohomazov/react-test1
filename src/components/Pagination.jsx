import React from 'react';

const Pagination = (props) => {
    const {page, total_pages, updatePage} = props;

    const handleClick = value => () => {
        updatePage(value)
    };




    return(

        <div className="container pagination">
            <div>
                <button className="pages btn" onClick={handleClick(1)}>1st</button>
                <button className="pages btn  mr-3" onClick={handleClick(page <= 10 ? 1 : page - 10)}>-10</button>
                <button className="pages btn" onClick={handleClick(page > 1 ? page-1 : page)}>Prev</button>
                {/*<button className="pages btn" onClick={handleClick(page > 1 ? page-1 : page)}> {page > 1 ? page-1 : "."}</button>*/}
                <button className="pages btn active">{page}</button>
                {/*<button className="pages btn" onClick={handleClick(page + 1)}>{page + 1}</button>*/}
                <button className="pages btn" onClick={handleClick(page + 1)}>Next</button>
                <button className="pages btn  ml-3" onClick={handleClick(page + 10)}>+10</button>
                <button className="pages btn" onClick={handleClick(total_pages)}>last</button>

                <div style={{display: 'block', }}>of {total_pages} pages </div>



            </div>
        </div>

    )
}

export default Pagination