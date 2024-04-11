import ModalBasic from "./ModalBasic";
import { InputSlide } from "../Components";

import PropTypes from "prop-types";

const defaultValue = 1;
export default function ModalFilterBrillo({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChange = val => {
		onChange({ ...properties, filters: { ...properties.filters, brillo: val } });
	};

	return (
		<ModalBasic onBack={onBack} position="bottom" type="inputs">
			<InputSlide
				value={properties.filters.brillo}
				onChange={handleChange}
				defaultNumber={defaultValue}
				name="Brillo"
				max={2}
				min={0}
			/>
		</ModalBasic>
	);
}
ModalFilterBrillo.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
