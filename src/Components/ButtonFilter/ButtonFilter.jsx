import style from "./style.module.css";
import PropTypes from "prop-types";
const filter = {
	desenfoque: "blur(3px)",
	sepia: "sepia(1)",
	saturacion: "saturate(4)",
	contraste: "contrast(1.75)",
	hue: "hue-rotate(90deg)",
	grises: "grayscale(1)",
	brillo: "brightness(1.75)",
};
export function ButtonFilter({ name = "unnamed", filters, ...props }) {
	return (
		<div className={style.container} {...props}>
			<img
				className={style.image}
				src="https://easydrawingguides.com/wp-content/uploads/2023/09/how-to-draw-mountains-featured-image-1200.png"
				style={{ filter: filter[name] }}
			/>
			<div className={style.slide}>
				<div className={style.slide__active} style={{ width: `${filters ? filters[name] || 0 : 0}%` }} />
			</div>
			<p className={style.name}>{name}</p>
		</div>
	);
}
ButtonFilter.propTypes = {
	name: PropTypes.string,
	filters: PropTypes.number,
};
