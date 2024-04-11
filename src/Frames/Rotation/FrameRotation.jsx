import PropTypes from "prop-types";

import css from "./style.module.css";
FrameRotation.propTypes = {
	properties: PropTypes.object.isRequired,
	onChange: PropTypes.func,
	refLimit: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired,
	zIndex: PropTypes.number.isRequired,
};
export default function FrameRotation({ children, onChange, properties, zIndex }) {
	return (
		<>
			<div
				className={css.container__element}
				style={{
					top: properties.positionY,
					left: properties.positionX,
					zIndex,
				}}
			>
				{children}
			</div>
		</>
	);
}
