import '../ToolTip/ToolTip.css';
import React from 'react';
import PropTypes from "prop-types";

const Tooltip = ({ content, children }) => {

    return (
        <div className={'tooltip'}>
            {children}
            <span className="tooltiptext">{content}</span>
        </div>
    );
};

Tooltip.propTypes = {
    content: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
};


export default Tooltip;