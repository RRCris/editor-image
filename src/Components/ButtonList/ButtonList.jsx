import css from "./style.module.css";
import PropTypes from "prop-types";
import { Iconify } from "../Iconify/Iconify";

const limitLArgeText = 14;
export function ButtonList({ object, diference, onClick }) {
	return (
		<div
			className={css.container}
			style={{ transform: `translateY(${diference * 95}px)` }}
			onContextMenu={e => e.preventDefault()}
		>
			{/* {drag === "prev" && <div className={css.barDrag} style={{ top: 0 }} />}
			{drag === "next" && <div className={css.barDrag} style={{ bottom: 0 }} />} */}
			<label className={css.content}>
				<button
					hidden
					name={"button to select image " + object.object.name}
					onClick={() => onClick && onClick(object.id)}
				/>
				<img src={object.object.src} />
				<p>{object.object.name.slice(0, limitLArgeText) + (object.object.name.length > limitLArgeText ? "..." : "")}</p>
				<Iconify icon="tabler:nut" size={35} />
			</label>
		</div>
	);
}
ButtonList.propTypes = {
	object: PropTypes.object,
	diference: PropTypes.num,
	onClick: PropTypes.func,
};
