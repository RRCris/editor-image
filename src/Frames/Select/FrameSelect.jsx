import PropTypes from "prop-types";

import { useState } from "react";

import css from "./style.module.css";
FrameSelect.propTypes = {
	properties: PropTypes.object.isRequired,
	onChange: PropTypes.func,
	refLimit: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired,
	zIndex: PropTypes.number.isRequired,
};
export default function FrameSelect({ children, onChange, properties, zIndex }) {
	const [show, setShow] = useState(false);
	const handleToggle = () => {
		setShow(!show);
	};
	return (
		<>
			<div
				className={css.container__element}
				style={{
					top: properties.positionY,
					left: properties.positionX,
					zIndex,
				}}
				onClick={handleToggle}
			>
				{children}
			</div>
		</>
	);
}
