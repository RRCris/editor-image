import { Iconify } from "../Iconify/Iconify";
import css from "./style.module.css";
import { useState } from "react";
import PropTypes from "prop-types";

export function TextField({ name = "TextField", valueOut = "", onChange }) {
	const [focus, setFocus] = useState(false);
	const [value, setValue] = useState(valueOut);

	const handleChange = e => {
		onChange && onChange(e.target.value);
		setValue(e.target.value);
	};

	return (
		<label
			className={`${css.container} ${focus && css.focus}`}
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			name={name}
		>
			<Iconify icon="fluent:rename-24-regular" size={35} />
			<div style={{ position: "relative" }}>
				<input type="text" value={value} onChange={handleChange} />
				<span className={`${css.name} ${(focus || value.length) && css.name__small}`}>{name}</span>
			</div>
		</label>
	);
}
TextField.propTypes = {
	name: PropTypes.string,
	valueOut: PropTypes.string,
	onChange: PropTypes.func,
};
