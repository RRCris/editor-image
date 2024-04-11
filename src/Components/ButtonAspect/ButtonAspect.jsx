import css from "./style.module.css";
import PropTypes from "prop-types";

export function ButtonAspect({ width, height, onClick, ...props }) {
	const OriginalWidth = width;
	const OriginalHeight = height;
	const aspect = width / height;
	const aspectReverse = height / width;
	if (aspect > 1) {
		width = 40;
		height = 40 * aspectReverse;
	} else {
		height = 40;
		width = 40 * aspect;
	}
	return (
		<label className={css.container} onClick={() => onClick(height / width)} {...props}>
			<button name={`aspect ratio  ${width}:${height}`} hidden />
			<div className={css.icon} style={{ width, height }} />
			<p>{`${OriginalWidth} : ${OriginalHeight}`}</p>
		</label>
	);
}
ButtonAspect.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
	onClick: PropTypes.func,
};
