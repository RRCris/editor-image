import ModalBasic from "./ModalBasic";
import { InputSlide } from "../Components";

import PropTypes from "prop-types";

const defaultValue = 0;
export default function ModalFilterGrises({ onBack, properties, onChange, AddHistoryItem }) {
	const handleChange = val => {
		onChange({ ...properties, filters: { ...properties.filters, grises: val } });
	};

	return (
		<ModalBasic onBack={onBack} position="bottom" type="inputs">
			<InputSlide
				value={properties.filters.grises}
				onChange={handleChange}
				defaultNumber={defaultValue}
				name="Grises"
				max={1}
				min={0}
			/>
		</ModalBasic>
	);
}
ModalFilterGrises.propTypes = {
	onBack: PropTypes.func,
	properties: PropTypes.object,
	onChange: PropTypes.func,
	AddHistoryItem: PropTypes.func,
};
