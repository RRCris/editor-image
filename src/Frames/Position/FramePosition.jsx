import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import css from "./style.module.css";
import { ElementFloat } from "../../ElementFloat";

FramePosition.propTypes = {
	properties: PropTypes.object,
	onChange: PropTypes.func,
	refLimit: PropTypes.elementType,
	children: PropTypes.element,
	zIndex: PropTypes.number,
};

export default function FramePosition({ properties, onChange, refLimit, children, zIndex }) {
	const refPreview = useRef(null);
	const handlePosition = newPosition => {
		onChange({ ...properties, positionX: newPosition.x, positionY: newPosition.y });
	};
	const handlePreview = newPreview => {
		if (refPreview.current) {
			const hidden = newPreview.x === properties.positionX && newPreview.y === properties.positionY;

			refPreview.current.style.top = newPreview.y + "px";
			refPreview.current.style.left = newPreview.x + "px";
			refPreview.current.style.display = hidden ? "none" : "block";
		}
	};
	useEffect(() => {
		handlePreview({ x: properties.positionX, y: properties.positionY });
	}, [properties]);

	return (
		<>
			<ElementFloat
				value={{ x: properties.positionX, y: properties.positionY }}
				ROOT={refLimit}
				onChange={handlePosition}
				onPreview={handlePreview}
				zIndex={zIndex}
			>
				<div className={css.container__element}>{children}</div>
			</ElementFloat>
			<div className={css.container__preview} ref={refPreview} style={{ zIndex }}>
				{children}
			</div>
		</>
	);
}
