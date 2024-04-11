import PropTypes from "prop-types";

import css from "./style.module.css";
FrameUnselect.propTypes = {
	properties: PropTypes.object.isRequired,
	onChange: PropTypes.func,
	refLimit: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired,
	zIndex: PropTypes.number.isRequired,
};
export default function FrameUnselect({ children, onChange, properties, zIndex }) {
	const handleToggle = () => {};
	return (
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
	);
}
