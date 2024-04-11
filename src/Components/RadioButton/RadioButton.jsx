import { Iconify } from "../Iconify/Iconify";
import css from "./style.module.css";
import PropTypes from "prop-types";

export function RadioButton({ value, onChange, icon, radio = 35, active }) {
	const handleToggle = e => {
		onChange(!value);
	};
	return (
		<label
			style={{ height: radio, width: radio }}
			className={`${value || active ? css.container_on : css.container_off} ${css.container}`}
			onClick={handleToggle}
		>
			<Iconify size={30} icon={icon} />
		</label>
	);
}
RadioButton.propTypes = {
	value: PropTypes.bool,
	active: PropTypes.bool,
	onChange: PropTypes.func,
	icon: PropTypes.string,
	radio: PropTypes.number,
};
