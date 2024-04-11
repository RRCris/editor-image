import PropTypes from "prop-types";
import css from "./style.module.css";
import { ElementFloat } from "../../ElementFloat";
import { useEffect, useRef } from "react";
import { Iconify } from "../../Components/Iconify/Iconify";
import { saveAspectRatioCrop } from "../../utilities";
FrameCrop.propTypes = {
	properties: PropTypes.object.isRequired,
	onChange: PropTypes.func,
	refLimit: PropTypes.object.isRequired,
	children: PropTypes.element.isRequired,
	zIndex: PropTypes.number,
};
export default function FrameCrop({ properties, onChange, refLimit, children, zIndex }) {
	const refContainer = useRef(null);
	const refPreview = useRef(null);

	useEffect(() => {
		if (refPreview.current) refPreview.current.style.display = "none";
	}, [properties]);

	const handleChange = (key, newPos) => {
		const oldPosition = properties.clipPath[key];
		const oldP = { x: oldPosition.x - center.x, y: oldPosition.y - center.y };
		const newP = { x: newPos.x - center.x, y: newPos.y - center.y };
		if (properties.lockAspectCrop) {
			const refactorP = saveAspectRatioCrop(newP, oldP);
			newPos = { x: center.x + refactorP.x, y: center.y + refactorP.y };
		}

		const newClipPath = properties.clipPath.map((obj, ky) => {
			if (ky === key) return newPos;
			else if (obj.x === oldPosition.x) return { x: newPos.x, y: obj.y };
			else if (obj.y === oldPosition.y) return { x: obj.x, y: newPos.y };
			return obj;
		});
		onChange({ ...properties, clipPath: newClipPath });
	};
	const handlePreview = (key, newPos) => {
		const oldPosition = properties.clipPath[key];
		if (properties.lockAspectCrop) {
			const newP = { x: newPos.x - center.x, y: newPos.y - center.y };
			const oldP = { x: oldPosition.x - center.x, y: oldPosition.y - center.y };
			const refactorP = saveAspectRatioCrop(newP, oldP);
			newPos = { x: center.x + refactorP.x, y: center.y + refactorP.y };
		}

		if (refPreview.current) {
			const newPreview = properties.clipPath.map((obj, ky) => {
				if (ky === key) return newPos;
				else if (obj.x === oldPosition.x) return { x: newPos.x, y: obj.y };
				else if (obj.y === oldPosition.y) return { x: obj.x, y: newPos.y };
				return obj;
			});
			refPreview.current.style.display = "block";
			refPreview.current.style.width = newPreview[1].x - newPreview[0].x + 2 + "px";
			refPreview.current.style.height = newPreview[3].y - newPreview[0].y + 2 + "px";
			refPreview.current.style.top = newPreview[0].y + "px";
			refPreview.current.style.left = newPreview[0].x + "px";
		}
	};
	const handleChangeCros = newPosition => {
		const oldPosition = {
			x: properties.clipPath[0].x + (properties.clipPath[1].x - properties.clipPath[0].x) / 2,
			y: properties.clipPath[0].y + (properties.clipPath[3].y - properties.clipPath[0].y) / 2,
		};
		const diference = { x: newPosition.x - oldPosition.x, y: newPosition.y - oldPosition.y };
		const newClipPath = properties.clipPath.map(obj => ({ x: obj.x + diference.x, y: obj.y + diference.y }));
		onChange({ ...properties, clipPath: newClipPath });
	};
	const handlePreviewCros = newPosition => {
		const diference = { x: newPosition.x - center.x, y: newPosition.y - center.y };
		const newPreview = properties.clipPath.map(obj => ({ x: obj.x + diference.x, y: obj.y + diference.y }));
		refPreview.current.style.display = "block";
		refPreview.current.style.width = newPreview[1].x - newPreview[0].x + 2 + "px";
		refPreview.current.style.height = newPreview[3].y - newPreview[0].y + 2 + "px";
		refPreview.current.style.top = newPreview[0].y + "px";
		refPreview.current.style.left = newPreview[0].x + "px";
	};

	const center = {
		x: properties.clipPath[0].x + (properties.clipPath[1].x - properties.clipPath[0].x) / 2,
		y: properties.clipPath[0].y + (properties.clipPath[3].y - properties.clipPath[0].y) / 2,
	};

	return (
		<>
			<div
				className={css.container__element}
				style={{ top: properties.positionY, left: properties.positionX, zIndex }}
				ref={refContainer}
			>
				{children}

				<div ref={refPreview} className={css.container__preview} />
				{properties.clipPath.map((pos, key) => (
					<ElementFloat
						value={pos}
						ROOT={refContainer}
						key={key}
						onChange={e => handleChange(key, e)}
						onPreview={e => handlePreview(key, e)}
						unMargin
					>
						<div className={`${css.point} `} />
					</ElementFloat>
				))}
				<ElementFloat ROOT={refContainer} onChange={handleChangeCros} onPreview={handlePreviewCros} value={center}>
					<div className={`${css.container__icon} `}>
						<Iconify icon="ri:drag-move-fill" size={20} />
					</div>
				</ElementFloat>
			</div>
		</>
	);
}
