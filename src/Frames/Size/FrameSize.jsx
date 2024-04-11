import { useEffect, useRef } from "react";
import { ElementFloat } from "../../ElementFloat";
import css from "./style.module.css";
import PropTypes from "prop-types";
import { saveAspectRatio } from "../../utilities";

FrameSize.propTypes = {
	properties: PropTypes.object,
	onChange: PropTypes.func,
	refLimit: PropTypes.object,
	children: PropTypes.element,
	zIndex: PropTypes.number,
};
export default function FrameSize({ properties, onChange, refLimit, children, zIndex }) {
	const positionPoint = [
		{ x: properties.positionX, y: properties.positionY },
		{ x: properties.positionX + properties.width, y: properties.positionY },
		{ x: properties.positionX + properties.width, y: properties.positionY + properties.height },
		{ x: properties.positionX, y: properties.positionY + properties.height },
	];

	const refPreview = useRef(null);
	useEffect(() => {
		refPreview.current.style.display = "none";
	}, [properties]);

	const handleChange = (key, newPointPosition) => {
		const currentPosition = positionPoint[key];
		const newPositionSize = positionPoint.map(point => {
			if (currentPosition.x === point.x && currentPosition.y === point.y) {
				return newPointPosition;
			}
			if (currentPosition.x === point.x) {
				return { y: point.y, x: newPointPosition.x };
			}
			if (currentPosition.y === point.y) {
				return { x: point.x, y: newPointPosition.y };
			}
			return point;
		});

		const newProperties = {
			...properties,
			positionX: newPositionSize[0].x,
			positionY: newPositionSize[0].y,
			width: newPositionSize[1].x - newPositionSize[0].x,
			height: newPositionSize[3].y - newPositionSize[0].y,
		};

		onChange(newProperties);
	};

	const handlePreview = (key, newPointPosition) => {
		const currentPosition = positionPoint[key];
		const newPositionSize = positionPoint.map(point => {
			if (currentPosition.x === point.x && currentPosition.y === point.y) {
				return newPointPosition;
			}
			if (currentPosition.x === point.x) {
				return { y: point.y, x: newPointPosition.x };
			}
			if (currentPosition.y === point.y) {
				return { x: point.x, y: newPointPosition.y };
			}
			return point;
		});

		let newProperties = {
			positionX: newPositionSize[0].x,
			positionY: newPositionSize[0].y,
			width: newPositionSize[1].x - newPositionSize[0].x,
			height: newPositionSize[3].y - newPositionSize[0].y,
		};
		if (properties.lockAspect) {
			newProperties = saveAspectRatio(properties, newProperties);
		}

		if (refPreview.current) {
			const IFPreviewIsEqual =
				newProperties.positionX === properties.positionX &&
				newProperties.positionY === properties.positionY &&
				newProperties.width === properties.width &&
				newProperties.height === properties.height;
			refPreview.current.style.display = IFPreviewIsEqual ? "none" : "block";
			refPreview.current.style.width = newProperties.width + "px";
			refPreview.current.style.height = newProperties.height + "px";
			refPreview.current.style.top = newProperties.positionY + "px";
			refPreview.current.style.left = newProperties.positionX + "px";
		}
	};

	return (
		<>
			<div style={{ top: properties.positionY, left: properties.positionX, zIndex }} className={css.container__element}>
				{children}
			</div>
			{positionPoint.map((pos, key) => (
				<ElementFloat
					key={key}
					ROOT={refLimit}
					value={pos}
					onChange={np => handleChange(key, np)}
					onPreview={np => handlePreview(key, np)}
					unMargin
					zIndex={zIndex}
				>
					<div className={css.point} />
				</ElementFloat>
			))}
			<div className={css.container__preview} ref={refPreview} style={{ zIndex }} />
		</>
	);
}
