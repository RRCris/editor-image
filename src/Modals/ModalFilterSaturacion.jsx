import ModalBasic from "./ModalBasic";
import { InputSlide } from "../Components";

import PropTypes from "prop-types";

const defaultValue = 1;
export default function ModalFilterSaturacion({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChange = val => {
		onChange({ ...properties, filters: { ...properties.filters, saturacion: val } });
	};

	return (
		<ModalBasic onBack={onBack} position="bottom" type="inputs">
			<InputSlide
				value={properties.filters.saturacion}
				onChange={handleChange}
				defaultNumber={defaultValue}
				name="Saturación"
				max={4}
				min={0}
			/>
		</ModalBasic>
	);
}
ModalFilterSaturacion.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
