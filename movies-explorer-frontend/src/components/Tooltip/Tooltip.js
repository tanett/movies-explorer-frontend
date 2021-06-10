import React from "react";
import "./Tooltip.css";

function Tooltip(props) {

React.useEffect(
    ()=> {
      const tooltip = document.querySelector('.tooltip');
     if (props.isOpen) {
       tooltip.classList.add('tooltip__visible')
     } else {tooltip.classList.remove('tooltip__visible')}
    }
)
  return (
      <section className={'tooltip'}>
        <h4 className={'tooltip__message'}>
          {props.message}
        </h4>
      </section>
  )
}

export default Tooltip;
